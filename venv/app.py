from flask import Flask
import base64
from flask import request
import io
import re 
# import matplotlib.pyplot as plt
import cv2 
import pytesseract 
from PIL import Image
from flask.json import jsonify
from flask.wrappers import Request
app = Flask(__name__)


@app.route('/hello' , methods = ['POST'])
def process():
  # return "hello"

  getjson = request.get_json()
  # print(getjson)
  print("got the getjson")
  tesseract_cmd = r'D:\Tesseract-OCR'
  data = getjson['encoded'] 
  im = base64.b64decode(data)
  image = open("d:/Decoded/image.png", "wb")
  image.write(im) 
  im = cv2.imread("d:/Decoded/image.png") 
  # plt.imshow(im)
  pytesseract.pytesseract.tesseract_cmd='D:\\Tesseract-OCR\\tesseract.exe'
  text=pytesseract.image_to_string(im)
  print(text)
  phno=re.search("[0-9]{5}.[0-9]{5}|[0-9]{10}",text)
  if phno == "" or phno == None :
    phno = ""
  else:
    phno = phno.group(0)
  name = re.search("[A-Z][a-z]+,?\s+(?:[A-Z][a-z]*\.?\s*)?[A-Z][a-z]+", text)
  if name == '' or name == None :
    name = ''
  else : 
    name = name.group(0)
  email = re.search("([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)", text)
  if email == "" or email == None :
    email = "" 
  else : 
    email = email.group(0)
  return jsonify({
  "phno:" : phno , 
  "name:" : name , 
  "email:" : email
  })
  

if __name__ == "__main__":
    app.run(host="192.168.0.105",port=5000 , debug=True)
