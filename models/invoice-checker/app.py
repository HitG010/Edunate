from flask import Flask, request, jsonify
# from pdf2image import convert_from_path
from PyPDF2 import PdfReader
import os

# Flask app setup
app = Flask(__name__)

# Path to Tesseract executable (adjust based on your installation)
# pytesseract.pytesseract.tesseract_cmd = '/usr/local/bin/tesseract'


# Directory to save uploaded files
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Parse invoice details
def parse_invoice(text):
    # Dummy parsing logic (replace with more robust parsing as needed)
    lines = text.split("\n")
    items = []
    total = 0
    for line in lines:
        if "Total" in line:
            total = (line.split()[-1])
        elif any(char.isdigit() for char in line):  # Assume line items contain numbers
            parts = line.split()
            name = " ".join(parts[:-2])
            quantity = int(parts[-2])
            price = (parts[-1])
            items.append({"name": name, "quantity": quantity, "price": price})
    return items, total

@app.route('/upload-invoice', methods=['POST'])
def upload_invoice():
    """
    Endpoint to upload a PDF and return parsed invoice details.
    """
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400

    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save uploaded file
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_file.filename)
    pdf_file.save(file_path)

    # try:
        # Extract text from the PDF
    text = extract_text_from_pdf(file_path)

        # Parse invoice details
    items, total = parse_invoice(text)
    
    print(items)
    print(total)

        # Return the parsed data as JSON
    return jsonify({"success": True, "invoice_data": invoice_data}), 200
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    # finally:
    #     # Clean up the uploaded file
    #     if os.path.exists(file_path):
    #         os.remove(file_path)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port = 3000)
