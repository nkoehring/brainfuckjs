brainfuck = function(src, stdin, stdout, debug) {
  /* stdin and stdout are functions taking or returning data respectively.
   * src contains the full source code
   * stdin returns one character code and acts as standard input
   * stdout(c) receives a single character code and acts as standard output
   */
  var c = 0,
      pos = 0,
      data = [0],
      ptr = 0,
      loopBeginPos = 0,
      loopEndPos = 0;

  function ptrDec() { if(ptr>0) ptr-- }
  function ptrInc() { if(++ptr == data.length) data.push(0) }
  function loopBegin() {
    loopBeginPos = pos
    loopEndPos = src.indexOf("]", loopBeginPos)
    if(!data[ptr]) pos = loopEndPos
  }
  function loopEnd() {
    if(data[ptr]) pos = loopBeginPos
  }

  function interpret(c) {
    var tmp = undefined

    switch(c) {
      case ">":
        if(debug) tmp = ptr
        ptrInc()
        if(debug) console.log(pos+"  next cell ("+tmp+"→"+ptr+")")
        break
      case "<":
        if(debug) tmp = ptr
        ptrDec()
        if(debug) console.log(pos+"  prev cell ("+tmp+"→"+ptr+")")
        break
      case "+":
        if(debug) tmp = data[ptr]
        data[ptr]++
        if(debug)
          console.log(pos+"  inc value in cell "+ptr+" ("+tmp+"→"+data[ptr]+")")
        break
      case "-":
        if(debug) tmp = data[ptr]
        data[ptr]--
        if(debug)
          console.log(pos+"  dec value in cell "+ptr+" ("+tmp+"→"+data[ptr]+")")
        break
      case ".":
        stdout(data[ptr])
        if(debug) console.log(pos+"  write from cell "+ptr)
        break
      case ",":
        data[ptr] = stdin()
        if(debug) console.log(pos+"  read to cell "+ptr)
        break
      case "[":
        loopBegin()
        if(debug) console.log(pos+"  "+(data[ptr]?"":"(skipped) ")+"loopBegin")
        break
      case "]":
        loopEnd()
        if(debug) console.log(pos+"  "+(data[ptr]?"repeat":"finish")+" loop")
        break
    }
  }

  while(c = src[pos]){
    interpret(c)
    pos++
  }
}

