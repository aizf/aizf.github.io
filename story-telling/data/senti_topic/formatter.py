import os
dirnames = ["topic0", "topic1", "topic2", "topic3", "topic4"]
for dirn in dirnames:
    files = os.listdir("./" + dirn)
    # print(files)
    # break
    for file in files:
        with open("./" + dirn + "/" + file) as f:
            lines = f.readlines()
            if len(lines) == 0:
                pass
            elif lines[0].find("[") == 0:
                pass
            else:
                temp = lines
                lines = ["["]
                for line in temp:
                    lines.append(line)
                    lines.append(",")
                lines.pop()
                lines.append("]")
            # print(lines)
            with open("./res/" + dirn + "/" + file, "w") as f1:
                for line in lines:
                    f1.write(line)