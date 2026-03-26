from fastapi import FastAPI,HTTPException,status,File,Depends,UploadFile,Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import xml.etree.ElementTree as ET
import base64


import socket

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]
    finally:
        s.close()


app = FastAPI(title="Only Office Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import time
SAVED_DIR = "documents_saved"
os.makedirs(SAVED_DIR, exist_ok=True)
# Serve uploaded files as static
TEMP_DIR = "temp_docs"
os.makedirs(TEMP_DIR,exist_ok=True)
app.mount("/saved", StaticFiles(directory=SAVED_DIR), name="saved")

app.mount("/temp", StaticFiles(directory=TEMP_DIR), name="temp")
# ── Upload endpoint ──────────────────────────────────────────


@app.get("/my-ip")
def my_ip():
    return {"ip": get_local_ip()}


key_to_filename: dict = {}
@app.post("/register-key")
async def register_key(data: dict):
    key      = data.get("key")
    filename = data.get("filename")
    if key and filename:
        key_to_filename[key] = filename
        print(f"📝 Registered: {key} → {filename}")
    return {"ok": True}

import httpx
import os


# ✅ store latest file URL per key — set by callback
key_to_url: dict = {}


# ✅ event to signal when callback receives the URL
key_events: dict = {}



@app.post("/callback")
async def callback(data: dict):
    status = data.get("status")
    key    = data.get("key")
    url    = data.get("url")

    print(f"📥 Callback → status: {status}, key: {key}")

    if status in [2, 6] and url:
        # ✅ always store URL in memory
        key_to_url[key] = url
        # ✅ signal preview if waiting
        if key in key_events:
            key_events[key].set()
        # ✅ only save to disk on status 2 (actual close/submit)
        # status 6 = forcesave (preview only) → DON'T save to disk

        # if status == 2:
        #     try:
        #         async with httpx.AsyncClient() as client:
        #             response = await client.get(url)
        #             response.raise_for_status()

        #         original_name = key_to_filename.get(key)
        #         filename      = original_name if original_name else f"{key}.docx"
        #         filepath      = os.path.join(SAVED_DIR, filename)

        #         with open(filepath, "wb") as f:
        #             f.write(response.content)

        #         print(f"✅ Saved → {filepath}")

        #     except Exception as e:
        #         print(f"❌ Failed to save: {e}")

    return {"error": 0}

@app.get("/files")
def list_files():
    files = []
    for filename in os.listdir(SAVED_DIR):
        filepath = os.path.join(SAVED_DIR, filename)
        if os.path.isfile(filepath):
            ext = filename.split('.')[-1].lower()
            files.append({
                "filename": filename,
                "ext":      ext,
                "size":     os.path.getsize(filepath),
                "modified": os.path.getmtime(filepath)
            })
    # sort by most recently modified
    files.sort(key=lambda x: x["modified"], reverse=True)
    return {"files": files}



@app.post("/forcesave")
async def forcesave(data: dict):
    key = data.get("key")
    if not key:
        return JSONResponse(status_code=400, content={"error": "No key"})
    try:
        async with httpx.AsyncClient() as client:
            r = await client.post(
                "http://localhost:8080/coauthoring/CommandService.ashx",
                json={"c": "forcesave", "key": key}
            )
            return {"ok": True, "result": r.json()}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})




@app.get("/doc-url/{key}")
async def get_doc_url(key: str):
    """
    Returns the OnlyOffice download URL stored by the /callback handler
    for a given doc key. Used by the frontend to reopen the same document
    on Edit without triggering a version conflict.
    """
    from main import key_to_url          # adjust import path if needed
    url = key_to_url.get(key)
    if not url:
        return {"url": None, "detail": "No URL found for this key yet"}
    logger.info(f"📎 doc-url requested for key={key} → {url}")
    return {"url": url}



@app.post("/submit")
async def submit(data: dict):
    filename = data.get("filename")
    key      = data.get("key")
    if not filename or not key:
        return JSONResponse(status_code=400, content={"error": "Missing data"})

    # get URL from memory
    url = key_to_url.get(key)
    if not url:
        # trigger forcesave to get URL
        async with httpx.AsyncClient() as client:
            await client.post(
                "http://localhost:8080/coauthoring/CommandService.ashx",
                json={"c": "forcesave", "key": key}
            )
        await asyncio.sleep(2.5)
        url = key_to_url.get(key)

    if not url:
        return JSONResponse(status_code=404, content={"error": "File not ready"})

    try:
        # ✅ download and save ONLY on submit
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()

        filepath = os.path.join(SAVED_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(response.content)

        print(f"✅ Submitted → {filepath}")
        return {"ok": True, "filename": filename}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

from pydantic import BaseModel

class PreviewRequest(BaseModel):
    key: str

import asyncio


# /preview - Backend handles ALL ONLYOFFICE communication

import base64


# @app.post("/preview")
# async def preview_document(data: PreviewRequest):
#     key      = data.key
#     filename = key_to_filename.get(key)
#     print(f"🔥 Preview for key: {key}, filename: {filename}")
    
#     try:
#         # Step 1 — forcesave
#         async with httpx.AsyncClient() as client:
#             r = await client.post(
#                 "http://localhost:8080/coauthoring/CommandService.ashx",
#                 json={"c": "forcesave", "key": key}
#             )
#             fs_result = r.json()
#             print(f"📤 Forcesave: {fs_result}")

#         fs_error = fs_result.get("error")

#         if fs_error == 0:
#             event = asyncio.Event()
#             key_events[key] = event
#             if key in key_to_url:
#                 event.set()
#             try:
#                 await asyncio.wait_for(event.wait(), timeout=5.0)
#             except asyncio.TimeoutError:
#                 print(f"⚠️ Timeout")
#             finally:
#                 key_events.pop(key, None)

#         docx_url = key_to_url.get(key)

#         # ✅ if no URL — use original file
#         if not docx_url:
#             ip = get_local_ip()
#             if key.startswith('saved-'):
#                 fname    = key.replace('saved-', '')
#                 docx_url = f"http://{ip}:8000/saved/{fname}"
#             else:
#                 docx_url = f"http://{ip}:3000/templates/new.docx"
#             print(f"⚠️ Using original: {docx_url}")
#         else:
#             # ✅ cache URL is only accessible from localhost:8080 internally
#             # download it first and re-serve via FastAPI temp endpoint
#             print(f"📥 Downloading from cache: {docx_url}")
#             async with httpx.AsyncClient() as client:
#                 dl = await client.get(docx_url)
#                 dl.raise_for_status()
#             with open("any_test.docx","wb") as e :
#                 e.write(dl.content)
#             # save to temp and serve via FastAPI
#             temp_filename = f"conv_{key}_{int(time.time())}.docx"
#             temp_path     = os.path.join(TEMP_DIR, temp_filename)
#             with open(temp_path, "wb") as f:
#                 f.write(dl.content)

#             ip       = get_local_ip()
#             docx_url = f"http://{ip}:8000/temp/{temp_filename}"
#             print(f"✅ Re-serving at: {docx_url}")

#         print(f"📄 Converting: {docx_url}")

#         # Step 2 — convert docx → PDF (response is XML not JSON)
#         conv_key = f"conv-{int(time.time())}"
#         async with httpx.AsyncClient(timeout=30.0) as client:
#             conv_response = await client.post(
#                 "http://localhost:8080/ConvertService.ashx",
#                 json={
#                     "async":      False,
#                     "filetype":   "docx",
#                     "key":        conv_key,
#                     "outputtype": "pdf",
#                     "title":      filename or "preview.pdf",
#                     "url":        docx_url
#                 },
#                 headers={"Content-Type": "application/json"}
#             )

#             print(f"📤 Conv status: {conv_response.status_code}")
#             print(f"📤 Conv body:   {conv_response.text}")

#             # ✅ parse XML response
#             root     = ET.fromstring(conv_response.text)
#             error    = root.findtext("Error")
#             pdf_url  = root.findtext("FileUrl")

#             print(f"📤 Conv error: {error}, pdf_url: {pdf_url}")

#             if error and error != "0":
#                 return JSONResponse(
#                     status_code=500,
#                     content={"error": f"Conversion error code: {error}"}
#                 )

#         if not pdf_url:
#             return JSONResponse(status_code=500, content={"error": "No FileUrl in response"})

#         # Step 3 — fetch PDF
#         async with httpx.AsyncClient() as client:
#             pdf_response = await client.get(pdf_url)
#             pdf_response.raise_for_status()

#         pdf_b64 = base64.b64encode(pdf_response.content).decode('utf-8')
#         print(f"✅ PDF ready: {len(pdf_response.content)} bytes")

#         # cleanup temp file
#         if 'temp_filename' in locals():
#             try: os.remove(temp_path)
#             except: pass

#         return {"pdf_base64": pdf_b64}

#     except Exception as e:
#         import traceback
#         print(f"❌ Error: {traceback.format_exc()}")
#         return JSONResponse(status_code=500, content={"error": str(e)})



# @app.post("/preview")
# async def preview_document(data: PreviewRequest):
#     key = data.key
#     filename = key_to_filename.get(key)
#     print(f"🔥 DOCX Preview for key: {key}, filename: {filename}")
    
#     try:
#         # Step 1 — forcesave (KEEP SAME)
#         async with httpx.AsyncClient() as client:
#             r = await client.post(
#                 "http://localhost:8080/coauthoring/CommandService.ashx",
#                 json={"c": "forcesave", "key": key}
#             )
#             fs_result = r.json()
#             print(f"📤 Forcesave: {fs_result}")

#         fs_error = fs_result.get("error")

#         # Step 2 — wait for callback (KEEP SAME)
#         if fs_error == 0:
#             event = asyncio.Event()
#             key_events[key] = event
#             if key in key_to_url:
#                 event.set()
#             try:
#                 await asyncio.wait_for(event.wait(), timeout=5.0)
#             except asyncio.TimeoutError:
#                 print(f"⚠️ Timeout")
#             finally:
#                 key_events.pop(key, None)

#         # Step 3 — get DOCX source (KEEP SAME)
#         docx_url = key_to_url.get(key)

#         if not docx_url:
#             ip = get_local_ip()
#             if key.startswith('saved-'):
#                 fname = key.replace('saved-', '')
#                 docx_url = f"http://{ip}:8000/saved/{fname}"
#             else:
#                 docx_url = f"http://{ip}:3000/templates/new.docx"
#             print(f"⚠️ Using original: {docx_url}")
#         else:
#             print(f"📥 Downloading from cache: {docx_url}")
#             async with httpx.AsyncClient() as client:
#                 dl = await client.get(docx_url)
#                 dl.raise_for_status()

#             # Save debug file (your line - KEEP)
#             with open("any_test.docx", "wb") as e:
#                 e.write(dl.content)

#             # Temp file for serving (KEEP SAME)
#             temp_filename = f"conv_{key}_{int(time.time())}.docx"
#             temp_path = os.path.join(TEMP_DIR, temp_filename)
#             with open(temp_path, "wb") as f:
#                 f.write(dl.content)

#             ip = get_local_ip()
#             docx_url = f"http://{ip}:8000/temp/{temp_filename}"
#             print(f"✅ Temp DOCX ready at: {docx_url}")

#         print(f"📄 DOCX ready: {docx_url}")

#         # 🔥 STEP 4: Download DOCX bytes DIRECTLY (NO PDF CONVERSION!)
#         async with httpx.AsyncClient(timeout=10) as client:
#             docx_response = await client.get(docx_url)
#             docx_response.raise_for_status()

#         # 🔥 Return DOCX bytes as base64 for React docx-preview
#         docx_b64 = base64.b64encode(docx_response.content).decode('utf-8')
#         print(f"✅ DOCX bytes ready: {len(docx_response.content)} bytes")

#         # Cleanup temp file
#         if 'temp_filename' in locals():
#             try:
#                 os.remove(temp_path)
#                 print(f"🧹 Cleaned temp file: {temp_path}")
#             except Exception as cleanup_err:
#                 print(f"⚠️ Cleanup failed: {cleanup_err}")

#         # 🔥 RETURN DOCX for React (NOT PDF!)
#         return {
#             "docx_arraybuffer": docx_b64,
#             "filename": filename or "preview.docx"
#         }

#     except Exception as e:
#         import traceback
#         print(f"❌ Preview error: {traceback.format_exc()}")
#         return JSONResponse(
#             status_code=500, 
#             content={"error": str(e)}
#         )






@app.post("/preview")
async def preview_document(data: PreviewRequest):
    key      = data.key
    filename = key_to_filename.get(key)
    print(f"🔥 Preview for key: {key}, filename: {filename}")
    
    try:
        # Step 1 — forcesave
        async with httpx.AsyncClient() as client:
            r = await client.post(
                "http://localhost:8080/coauthoring/CommandService.ashx",
                json={"c": "forcesave", "key": key}
            )
            fs_result = r.json()
            print(f"📤 Forcesave: {fs_result}")

        fs_error = fs_result.get("error")

        if fs_error == 0:
            event = asyncio.Event()
            key_events[key] = event
            if key in key_to_url:
                event.set()
            try:
                await asyncio.wait_for(event.wait(), timeout=5.0)
            except asyncio.TimeoutError:
                print(f"⚠️ Timeout")
            finally:
                key_events.pop(key, None)

        docx_url = key_to_url.get(key)

        # ✅ if no URL — use original file
        if not docx_url:
            ip = get_local_ip()
            if key.startswith('saved-'):
                fname    = key.replace('saved-', '')
                docx_url = f"http://{ip}:8000/saved/{fname}"
            else:
                docx_url = f"http://{ip}:3000/templates/new.docx"
            print(f"⚠️ Using original: {docx_url}")
        else:
            # ✅ cache URL is only accessible from localhost:8080 internally
            # download it first and re-serve via FastAPI temp endpoint
            print(f"📥 Downloading from cache: {docx_url}")
            async with httpx.AsyncClient() as client:
                dl = await client.get(docx_url)
                dl.raise_for_status()
            with open("any_test.docx","wb") as e :
                e.write(dl.content)
            # save to temp and serve via FastAPI
            temp_filename = f"conv_{key}_{int(time.time())}.docx"
            temp_path     = os.path.join(TEMP_DIR, temp_filename)
            with open(temp_path, "wb") as f:
                f.write(dl.content)

            ip       = get_local_ip()
            docx_url = f"http://{ip}:8000/temp/{temp_filename}"
            print(f"✅ Re-serving at: {docx_url}")

        print(f"📄 Converting: {docx_url}")

        # Step 2 — convert docx → PDF (response is XML not JSON)
        # conv_key = f"conv-{int(time.time())}"
        print(f"📄 Converting DOCX → HTML: {docx_url}")

        # 🔥 ConvertService: DOCX → HTML (preserves shapes!)
        conv_key = f"html-{int(time.time())}"
        async with httpx.AsyncClient(timeout=20.0) as client:
            conv_response = await client.post(
                "http://localhost:8080/ConvertService.ashx",
                json={
                    "async": False,
                    "filetype": "docx",
                    "key": conv_key,
                    "outputtype": "html",      # ✅ HTML!
                    "title": filename or "preview.html",
                    "url": docx_url
                },
                headers={"Content-Type": "application/json"}
            )

        print(f"📤 HTML Conv status: {conv_response.status_code}")
        print(f"📤 HTML Conv body: {conv_response.text[:200]}...")

        # Parse XML response
        root = ET.fromstring(conv_response.text)
        error = root.findtext("Error")
        html_url = root.findtext("FileUrl")

        print(f"📤 HTML error: {error}, url: {html_url}")

        if error and error != "0":
            raise ValueError(f"HTML conversion failed: {error}")

        if not html_url:
            raise ValueError("No FileUrl in HTML response")

        # Download HTML
        async with httpx.AsyncClient() as client:
            html_response = await client.get(html_url)
            html_response.raise_for_status()

        # Cleanup
        if 'temp_filename' in locals():
            try: os.remove(temp_path)
            except: pass

        print(f"✅ HTML ready: {len(html_response.content)} bytes")
        
        # 🔥 Return HTML content for React
        return {
            "html_content": html_response.text,
            "filename": filename or "preview.html"
        }

    except Exception as e:
        import traceback
        print(f"❌ HTML Preview error: {traceback.format_exc()}")
        return JSONResponse(status_code=500, content={"error": str(e)})



from fastapi import APIRouter, Form
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)



# ── Schema (for documentation / future DB use) ──────────────
class QuestionData(BaseModel):
    subject:        str
    question_type:  str
    correct_option: str
    marks:          str
    difficulty:     str
    question_html:  str
    option_a_html:  str
    option_b_html:  str
    option_c_html:  str
    option_d_html:  str


# ── Route ────────────────────────────────────────────────────
@app.post("/submit-question")
async def submit_question(
    subject:        str = Form(...),
    question_type:  str = Form(...),
    correct_option: str = Form(...),
    marks:          str = Form(...),
    difficulty:     str = Form(...),
    question_html:  str = Form(...),
    option_a_html:  str = Form(""),
    option_b_html:  str = Form(""),
    option_c_html:  str = Form(""),
    option_d_html:  str = Form(""),
):
    data = QuestionData(
        subject        = subject,
        question_type  = question_type,
        correct_option = correct_option,
        marks          = marks,
        difficulty     = difficulty,
        question_html  = question_html,
        option_a_html  = option_a_html,
        option_b_html  = option_b_html,
        option_c_html  = option_c_html,
        option_d_html  = option_d_html,
    )
    import json
    with open("new_questions.json", "a", encoding="utf-8") as f:  # 'a' to append multiple submissions
        json.dump(data.dict(), f, ensure_ascii=False, indent=2)
        f.write("\n" + "="*80 + "\n\n")

    # ── log everything ───────────────────────────────────────
    logger.info("=" * 60)
    logger.info("📥  NEW QUESTION SUBMISSION")
    logger.info("=" * 60)
    logger.info(f"  Subject        : {data.subject}")
    logger.info(f"  Question Type  : {data.question_type}")
    logger.info(f"  Difficulty     : {data.difficulty}")
    logger.info(f"  Marks          : {data.marks}")
    logger.info(f"  Correct Option : {data.correct_option}")
    logger.info("-" * 60)
    logger.info(f"  Question HTML  :\n{data.question_html}")
    logger.info("-" * 60)
    logger.info(f"  Option A HTML  :\n{data.option_a_html}")
    logger.info(f"  Option B HTML  :\n{data.option_b_html}")
    logger.info(f"  Option C HTML  :\n{data.option_c_html}")
    logger.info(f"  Option D HTML  :\n{data.option_d_html}")
    logger.info("=" * 60)

    return {"ok": True, "message": "Question received and logged."}


# ── Health check ─────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)