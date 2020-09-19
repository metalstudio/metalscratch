with open('block.xml','r',encoding='utf-8') as f:
    rt=f.read()
rt=rt.split('\n')
rt=''.join(rt)
print(rt)
with open('block.xml','w',encoding='utf-8') as f:
    f.write(rt)