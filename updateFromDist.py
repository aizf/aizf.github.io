import os
distPath = r"D:\Documents\GitHub\test-antd\dist"
thisPath = r"D:\Documents\GitHub\aizf.github.io"
updateFiles = ("favicon.ico", "index.html")
updateDirs = ("assets", "static")

# remove
for obj in updateFiles:
    os.system("DEL /S /Q {}".format('"' + thisPath + "\\" + obj + '"'))
for obj in updateDirs:
    os.system("rd /S /Q {}".format('"' + thisPath + "\\" + obj + '"'))

# copy
os.system("xcopy /E/Y {} {}".format(('"' + distPath + '"'),
                                    ('"' + thisPath + '"')))

# change index.html import path
with open(thisPath + "\\" + "index.html ","r") as f:
    text=f.read()
    text=text.replace("/assets", "./assets").replace("/favicon.ico", "./favicon.ico")

with open(thisPath + "\\" + "index.html ", "w") as f:
    f.write(text)
