import os
import urllib.request

logos = {
    "HDFC Bank": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.hdfcbank.com&size=256",
    "ICICI Bank": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.icicibank.com&size=256",
    "Axis Bank": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.axisbank.com&size=256",
    "SBI": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.onlinesbi.sbi&size=256",
    "HSBC": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.hsbc.com&size=256",
    "Barclays": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.barclays.com&size=256",
    "Citibank": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.citibank.com&size=256",
    "Standard Chartered": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.sc.com&size=256"
}

output_dir = os.path.join("frontend", "public", "banks")
os.makedirs(output_dir, exist_ok=True)

for name, url in logos.items():
    safe_name = name.lower().replace(" ", "_").replace("(", "").replace(")", "")
    file_path = os.path.join(output_dir, f"{safe_name}.png")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(file_path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {name} to {file_path}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
