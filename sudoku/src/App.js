import logo from './logo.svg';
import './App.css';
import { useState } from 'react';



const temp = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
]
function App() {
  const[initial, setInitial] = useState(temp);
  const[sudokuArr, setsudokuArr] = useState(initial);
  const[r, setr] = useState(-1);
  const[c, setc] = useState(-1);


  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e,row,col) {
    var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuArr);
    if (val === -1 || val >=1 && val <=9){
      grid[row][col] = val;
    }
    setsudokuArr(grid);
  }



  function compareSudoku(currentSudoku, solveSudoku){
    let res = {
      isComplete: true,
      isSolvable: true
    }
    for(var i = 0; i<9; i++){
      for(var j = 0; j<9; j++){
        if(currentSudoku[i][j]!== solveSudoku[i][j]){
          if(currentSudoku[i][j] != -1){
            res.isSolvable = false;
          }
          res.isComplete = false;
        }
      }
    }
    return res;
  }

  function checkSudoku(){
    let sudoku = getDeepCopy(initial);
    solver(sudoku);
    let compare = compareSudoku(sudokuArr, sudoku);
    if (compare.isComplete){
      alert("Sudoku is solved!");
    }
    else if (compare.isSolvable){
      alert("Sudoku is solvable!");
    }
    else{
      alert("Sudoku is not solvable!");
    }
  }

  function checkRow(grid, row, num){
    return grid[row].indexOf(num) === -1;
  }

  function checkCol(grid, col, num){
    return grid.map(row => row[col]).indexOf(num) === -1;
  }

  function checkBox(grid, row, col, num){
    let boxArr = [],
    rowStart = row - (row%3),
    colStart = col - (col%3);
    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        boxArr.push(grid[rowStart + i][colStart + j]);
      }
    }
    
    return boxArr.indexOf(num) === -1;
  }

  function checkValid(grid, row, col, num){
    if(checkRow(grid, row, num) && checkCol(grid, col, num) && checkBox(grid, row, col, num)){
      return true;
    }
    return false;
  }

  function getNext(row, col){
    return col !== 8 ? [row, col + 1] : row != 8 ? [row+1, 0] : [0,0];
  }
  
  function solver(grid, row=0, col=0){

    if (grid[row][col] !== -1){
      let isLast = row >= 8 && col >= 8;
      if(!isLast){
        let [newRow, newCol] = getNext(row, col);
        return solver(grid, newRow, newCol);
      }
    }
    for (let num = 1; num<=9; num++) {
      if (checkValid(grid, row, col, num)){
        grid[row][col] = num;
        let [newRow, newCol] = getNext(row, col);

        if (!newRow && !newCol){
          return true;
        }
        if (solver(grid, newRow, newCol)){
          return true;
        }
      }
    }

    grid[row][col] = -1;
    return false;
  }

  function solveSudoku(){
    let flag = 1;
    for(let i =0; i<9; i++){
      for(let j =0; j<9; j++){
        if(initial[i][j] !== -1){
          flag = 0;
          break;
        }
      }
      if (flag === 0){
              break;
      }
    }
    if (flag === 0){
    let sudoku = getDeepCopy(initial);
    
    solver(sudoku);
    setsudokuArr(sudoku);

    }


  }


  function clearSudoku(){
    let sudoku = getDeepCopy(initial);
    for(let i =0; i<9; i++){
      for(let j =0; j<9; j++){
        if(sudoku[i][j] !== -1){
        sudoku[i][j] = -1;
        }
      }
    }
    setInitial(sudoku);
    setsudokuArr(sudoku);

  }

  function checkInput(grid, row, col, num){
    let c = 0;
    for(let i= 0; i<9; i++){
      if(grid[row][i]===num){
        c++;
      }
      if(grid[i][col]===num){
        c++;
      }
    }
    let rowStart = row - (row%3);
    let colStart = col - (col%3);
    for(let i = rowStart; i<rowStart+3; i++){
      for(let j = colStart; j<colStart+3; j++){
        if(grid[i][j]=== num){
          c++;
        }
      }
    }
    if(c===3){
      return true;
    }
    else{
      return false;
    }

  }

  function setSudoku(){
      let sudoku = getDeepCopy(sudokuArr);
      for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
          if(sudoku[i][j]!== -1){
            if(!checkInput(sudoku, i, j, sudoku[i][j])){
              alert("Not a Valid sudoku");
              return false;
            }
          }
        }
      }
      setInitial(sudoku);
      setsudokuArr(sudoku);

  }

  function select(row, col){
    setr(row);
    setc(col);
  }

  function onClickInput(index,row,col) {
    var val = index || -1, grid = getDeepCopy(sudokuArr);
    if (val === -1 || val >=1 && val <=9){
      grid[row][col] = val;
    }
    setsudokuArr(grid);
  }



  function makeSudoku(){
    let grid = getDeepCopy(temp);
      for(let i=0; i<9; i++){
        let n = Math.floor(Math.random()*6)+1;
        let index = [];
        while(index.length < n){
          let r = Math.floor(Math.random() * 9);
          if(index.indexOf(r) === -1) index.push(r);
        }
        let flag = 0;
        while(flag < n){
          let number = Math.floor(Math.random() * 9) + 1;
          if(checkValid(grid, i, index[flag], number)){
            grid[i][index[flag]] = number;
            flag++;
          }
          else{
            while (true){
              if(number === 9){
                flag++;
                break;
              }
              else{
                if(checkValid(grid, i, index[flag], number)){
                  grid[i][index[flag]] = number;
                  flag++;
                  break;
                }
                else{
                  number++;
                }
              }
            }
          }
        }
      }
      return grid;
  }
  


  function playSudoku(){
    
    let grid = makeSudoku();
    let sudoku = getDeepCopy(grid);
      while(!solver(grid)){
        grid = makeSudoku();
        sudoku = getDeepCopy(grid);
      }
      setInitial(sudoku);
      setsudokuArr(sudoku);

  }


  return (
    <div className="App">
      <div className='navBar'>  
      <h1>Sudoku Solver</h1>
      <div>
        <button className='navButton' onClick={solveSudoku}>Solve</button>
        <button className='navButton' onClick={playSudoku}>Play</button> 
      </div>
      </div>
      <div className='sudoku-container'>  
        <table className='sudoku-table'>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map((row, rindex) => {
                return <tr key = {rindex} className={(row === 2 || row === 5 ) ? 'rBorder': ''}>
                  {[0,1,2,3,4,5,6,7,8].map((col, cindex) => {
                    return <td key = {cindex + rindex} className={(col === 2 || col === 5) ? 'cBorder': ''}>
                      <input onChange={initial[row][col] === -1 ?(e)=> onInputChange(e, row, col): null} 
                      onClick={initial[row][col] === -1 ?(e) => select(row, col): null}
                      value={sudokuArr[row][col] === -1 ? ' ' : sudokuArr[row][col]} 
                      className={initial[row][col] === -1 ? 'emptyCell' : 'cell'}></input>
                    </td>
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
        <table>
          <tbody>
            {
              [0,1,2,3,4,5,6,7,8].map((index) =>{
                return <td key={index} className='cBorder'>
                  <button className= 'inputButton' onClick={(e) => onClickInput(index+1, r, c)}>{index+1}</button>
                </td>
              })
            }
          </tbody>
        </table>
        <div className='sButtons'>
          {/* <button className='solveButton' onClick={solveSudoku}>Solve</button> */}
          <button className='solveButton' onClick={checkSudoku}>Check</button>
          <button className='solveButton' onClick={clearSudoku}>Clear</button>
          <button className='solveButton' onClick={setSudoku}>Set</button>
        </div>
      </div>
    </div>
  );
}

export default App;
