import rememberMe from ".";
const add = (x,y,z) => x+y+z
const smartAdder = rememberMe(add)

smartAdder(1,2,3)//computed
smartAdder(1,2,3)//cached
smartAdder(1,2,3,4)//computed
smartAdder(1,2,3,4)//cached