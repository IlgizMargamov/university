import os
from PyPDF2 import PdfFileReader, PdfFileWriter
from pdf2image import convert_from_path

your_target_folder = "training_data"
pdf_files = []
for dirpath, _, filenames in os.walk(your_target_folder):
    for items in filenames:
        file_full_path = os.path.abspath(os.path.join(dirpath, items))
        if file_full_path.lower().endswith(".pdf"):
            pdf_files.append(file_full_path)
pdf_files.sort(key=str.lower)


for file_path in pdf_files:
    writer = PdfFileWriter()
    reader = PdfFileReader(file_path)
    left_page = reader.getPage(0)
    try:
        right_page = reader.getPage(1)
    except:
        print("lol")
    #page.scaleBy(0.1)
    writer.addPage(left_page)
    writer.addPage(right_page)
    with open(f"{file_path}", "wb") as output:
        writer.write(output)

    image = convert_from_path(file_path)
    folder_name = file_path + "_folder"
    os.makedirs(folder_name)
    number=1
    for i in image:
        i.save(f"{folder_name}/{number}.jpg", "JPEG")
        print(folder_name+" "+str(number)+" has been converted to jpeg")
        number+=1
