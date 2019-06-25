// Vendors
import React from "react"
// Style
import "./bookView.scss"
// Services
import { BookService, BagService } from "../../shared/services";
// Interfaces
import { IBook } from "../../shared/interfaces";


interface data {
    dataBook: any,
    dataAuthor: any,
};

const bookService = new BookService();
const bagService = new BagService();

export default class Book extends React.Component<any, data> {
    constructor(
        props: any,
        ) {
        super(props);
        this.state = {
            dataBook: [],
            dataAuthor: [],
        };
    };

    

    componentDidMount() {
        bookService.getBookWidthAuthors(this.props.match.params.id).then((res) => {
            this.setState({
                dataBook: res,
            });
        });
    };

    private addBookToBag(book: IBook): void {
        bagService.addToBag(book);
    };

    public render() {
        const book = this.state.dataBook;
        return(
            <section className="bookView">
                <h2 className="bookView__title">{ book.title }</h2>
                <p className="bookView__info">{ book.description }</p>
                <p className="bookView__type">Тип: { book.type }</p>
                <p className="bookView__price">Цена: { book.price }$</p>
                <p className="bookView__author" 
                >Автора: <span>{ book.author }</span></p>
                <button onClick={() => this.addBookToBag(book)} className="addToBag">Добавить в корзину</button>
            </section> 
        );
    }
}