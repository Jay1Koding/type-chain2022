// import * as crypto from 'crypto';

// "esModuleInterop": true 로 해결할 수 있음
import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('shake256').update(toHash).digest('hex');
  }
}

class BlockChain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockChain = new BlockChain();

blockChain.addBlock('1st one');
blockChain.addBlock('2nd one');
blockChain.addBlock('3rd one');

blockChain.getBlocks().push(new Block('xxxx', 11, 'Hackkkkkkkkked'));

console.log(blockChain.getBlocks());
