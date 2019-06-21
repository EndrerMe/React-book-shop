// interfaces
import { IBook } from "../interfaces";

export class BagService {
    public bag: IBook[] = [] as IBook[];

  constructor() {
    if (localStorage.getItem("bag")) {
      this.bag = JSON.parse(localStorage.getItem('bag') as any);
    }
  }

  public getBag(): IBook[] {
    return this.bag;
  }

  public addToBag(book: IBook): void {

    if (localStorage.getItem("bag")) {
      this.bag = JSON.parse(localStorage.getItem('bag') as any);
    }

    if (this.bag.length === 0) {
      book.value = 1;
      this.bag.push(book);
      localStorage.setItem('bag', JSON.stringify(this.bag));
      return;
    }
    if (this.bag.length !== 0) {
      let flag = false;
      for (let i = 0; i < this.bag.length; i++) {
        if (this.bag[i].idbooks !== book.idbooks) {
          flag = false;
        } else {
          this.bag[i].value ++;
          flag = true;
          break;
        }
      }

      if (flag) {
        localStorage.setItem('bag', JSON.stringify(this.bag));
      }
      if (!flag) {
        book.value = 1;
        this.bag.push(book);
        localStorage.setItem('bag', JSON.stringify(this.bag));
      }
    }
    
  }
}