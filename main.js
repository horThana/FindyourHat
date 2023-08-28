const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '👑';
const hole = '⭕';
const fieldCharacter = '🌲';
const pathCharacter = '🧔';

class Field {
  constructor(fieldArray = [[]]) {
    this.fieldArray = fieldArray;
    this.positionX = 0;
    this.positionY = 0;
    this.fieldArray[0][0] = pathCharacter; // Set the "home" position before the game starts
  }

  
  //print field method to make it eaier 
  print() {
    for (const mapping of this.fieldArray){
      console.log(mapping.join(''));
    }
    //clear();
    // your print map code here
  }
  move(direction){  //กำหนดทิศทางเดิน
    switch(direction){
      case 'W' :
        this.positionX -= 1; 
        break;
      case 'S' :
        this.positionX += 1;
        break;
      case 'A' :
        this.positionY -= 1;
        break;
      case 'D' :
        this.positionY += 1;
        break;
    }
    if (this.isOutOfBound() || this.isHole() || this.isWin()){
      return false;
    }
    this.fieldArray[this.positionX][this.positionY] = pathCharacter;
    clear(); // หลังจากที่เข้ากดเดินแล้วเราจะไม่ทำการโหลดหน้าใหม่หรือทำซ้ำ ใช้คำสั่ง clear เพื่อให้มันแสดงผลหน้าเดียว
    return true;
  }
  isOutOfBound() { //กำหนดขอบเขตของกำแพง
  if (this.positionX < 0) {
    return true; //กำหนดเขตด้านบน
  }
  if (this.positionX >= this.fieldArray.length) {
    return true;  
  }
  if (this.positionY < 0) {
    return true; 
  }
  if (this.positionY >= this.fieldArray[0].length) {
    return true;
  }
  return false; 
  }
  isHole() {
  if (this.fieldArray[this.positionX][this.positionY] === hole) {
    return true; // Character is on a hole
  }
    return false; // Character is not on a hole
  };
  // กำหนดค่าของสถานะปัจจุบันตามตำแหน่งที่ตั้งของ player 
  isWin(){
    if(this.fieldArray[this.positionX][this.positionY] === hat){
      return true;
    }
      return false;
  };
  static generateField(height, width, holePercentage){
    const totalTiles = height * width; 
    const numHoles = Math.floor(totalTiles * (holePercentage / 150 )); 

    //กำหนดพื่นที่ และตัวละคร
    const fieldArray = new Array(height).fill(null).map(() => new Array(width).fill(fieldCharacter));
  
 // for loop สำหรับสุ่ม hole ในแผนที่
    
    for(let i = 0; i < numHoles ; i ++){
      let randomX, randomY;
        // สุ่ม hole ใน field โดยกำหนดเป็นแนว X - Y
      do{
        randomX = Math.floor(Math.random() * height);
        randomY = Math.floor(Math.random() * width);
        
      } while (fieldArray[randomX][randomY ] !== fieldCharacter);
      
      fieldArray[randomX][randomY ] = hole;
    }
     //สุ่ม hat โดยกำหนดค่าคล้าย ๆ กับ hole
  const randomX = Math.floor(Math.random() * height);
  const randomY = Math.floor(Math.random() * width);
    fieldArray[randomX][randomY ] = hat;

    return new Field(fieldArray);
  }
};
    
  // the rest of your code starts here.
  //main game loop :D

function game(){
  const height = 20 ; // กำหนดความสูงของ map 
  const width = 20 ; // กำหนดความกว้างของ mapp

  const holePercentage = 30 ; // กำหนดเปอร์เซนการเกิดหลุม * hole 

  const gameField = Field.generateField(height, width, holePercentage); //กำหนด gamefield
  
  while (true) {
    gameField.print();
    const direction = prompt("Let's try your move (W/A/S/D) :: ").toUpperCase();
    const result = gameField.move(direction);

    if (!result){
      if (gameField.isWin()){ //ถ้าเราเดินไปเจอหมวกแล้วว ....
        console.log('Congratulation You Find your Hat 🤴');
      }else if (gameField.isHole()){ //ถ้าเดินไปตกหลุม
        console.log('SO SAD YOU JUST FALL IT PLS TRY AGAIN !. 💀')
      }else if (gameField.isOutOfBound()){ //เมื่อคงเดินชนกำแพง
        console.log('You can walk thounght it PLS TRY AGAIN.💀');
      }
      break;
    }
  }
}
game();
