// Vendors
import React from "react"
import Select from 'react-select';
import Pagination from "react-js-pagination";

// Style
import "./books.scss"
// Services
import { BookService } from "../../../shared/services/book.service";
import { AuthorService } from "../../../shared/services/author.service";
// Interfaces
import IBook from "../../../shared/interfaces/book.interface";

const bookService = new BookService();
const authorService = new AuthorService();


export default class Books extends React.Component<any,any> {


    constructor (props: any) {
        super(props)

        this.state = {
            bookInfo: null,
            addNewAuthorModal: false,
            changeBookModal: false,

            books: [],

            authors: [],

            authorsForBook: [],

            newAuthor: {
                authorName: ""
            },

            clearForm: {
                title: "",
                type: "",
                description: "",
                authors: [],
                price: ""
            },

            newBook: {
                title: "",
                type: "",
                description: "",
                authors: [],
                price: ""
            },

            idOfChangedBook: null,

            activePage: 1,
            totalItemPerPage: 4,
            totalItem: 0,
        }

        this.addAuthorToState = this.addAuthorToState.bind(this)
        this.addBookToState = this.addBookToState.bind(this)
        this.addToMultiselectValue = this.addToMultiselectValue.bind(this)
    }

    componentDidMount() {

        bookService.getAllBooks().then((res) => {
            this.setState({
              totalItem: res,
            })
          })
        

        bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage)
        .then((res) => {
            this.setState({
                books: res
            })
        })

        authorService.getAllAuthors().then((res) => {
            this.setState ({
                authors: res
            })
        })
    }

    private async addToMultiselectValue(option: any) {

        console.log(option)

        await this.setState((prevState: any) => ({
            newBook: {
                ...prevState.newBook,
                authors: option
            }
        }));   
    }

    private async addBookToState(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState((prevState: any) => ({
            newBook: {
                ...prevState.newBook,
                [name]: value
            }
        }));
    }

    private addAuthorToState(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            newAuthor: {
                [name]: value
            }
        });
      }

    private showBookInfo(book: IBook): void {

        if (this.state.bookInfo === book.idbooks) {
            this.setState ({
                bookInfo: null
            })
            return
        }

        this.setState ({
            bookInfo: book.idbooks
        })

        bookService.getAuthorForBooks(book.idbooks).then((res: any) => {
            let authors = res
            this.setState ({
                authorsForBook: authors
            })
        })
    }

    private showNewBookModal(): void {
        this.setState ({
            newBookModal: true
        })
    }

    private closeNewBookModal(): void {
        this.setState ({
            newBookModal: false
        })
    }

    private showChangeBookModal(id: number): void {
        this.setState ({
            changeBookModal: true,
            idOfChangedBook: id
        })
    }

    private closeChangeBookModal(): void {
        this.setState ({
            changeBookModal: false
        })
    }

    private addNewBook(): void {
        let books = this.state.books
        let newBook = this.state.newBook

        bookService.addNewBook(newBook).then((res) => {
            books.push(newBook)

            this.setState({
                books: books,
                newBookModal: false,
                newBook: this.state.clearForm
            })
        })
    }

    private changeBook(): void {
        let bookId = this.state.idOfChangedBook
        let books = this.state.books
        let changedBook = this.state.newBook
        console.log(books)
        changedBook.bookid = bookId

        for (let i = 0; i < changedBook.Author; i++) {
            delete changedBook.Author[i].value;
            delete changedBook.Author[i].label;
        }

        bookService.changeBook(changedBook)

        for (let i = 0; i < books.length; i++) {
            console.log(i)
            if (bookId === books[i].idbooks) {
                console.log("yes")
                books[i] = changedBook
                this.setState({
                    books: books,
                    changeBookModal: false
                })
            }
        }
    }

    private deleteBook(id: number): void {
        let books = this.state.books
        bookService.deleteBook(id)

        for (let i = 0; i < books.length; i++) {
            if (id === books[i].idbooks) {
                books.splice(i, 1)
                this.setState({
                    books: books
                })
            }
        }
    }

    private async handlePageChange(pageNumber: any) {
        await this.setState({activePage: pageNumber});
        bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
          this.setState({
            books: res
          })
        })
      }

    public render() {

        let books = this.state.books

        let authors = this.state.authors;
        let authorsForBook = this.state.authorsForBook
        let newBook = this.state.newBook;

        for (let i = 0; i < authors.length; i++) {
            authors[i].label = authors[i].authorName
            authors[i].value = authors[i].idauthors
        }

        return (
          <section className="editBooks">
            <button type="button" 
            className="btn btn-info"
            onClick={() => this.showNewBookModal()}>Добавить книгу</button>

            <div className="allBooks">

                {books.map((book: IBook) => {
                    return (
                        <div key={book.idbooks}>
                            <div className="book">
                                <h4 className="book__name">{book.title}</h4>
                                {
                                    this.state.bookInfo === book.idbooks?
                                    <span className="book__Show"
                                    onClick={() => this.showBookInfo(book)}>Скрыть</span>
                                    :
                                    <span className="book__Show"
                                    onClick={() => this.showBookInfo(book)}>Показать</span>
                                }
                            </div>
                            {
                                this.state.bookInfo === book.idbooks? 
                                <div className="bookInfo">
                                    <h4 className="bookInfo__name">Название книги: {book.title}</h4>
                                    <p className="bookInfo__email">Тип книги: {book.type}</p>
                                    <p className="bookInfo__pass">Информация о книге: {book.description}</p>
                                    <p className="bookInfo__genre">Автора книги:
                                    {authorsForBook.map((author: any) => {
                                        return (
                                            <span key={author.Author.idauthors}> {author.Author.authorName} </span>
                                        );
                                    })}
                                    </p>
                                    <p className="bookInfo__role">Цена книги:  {book.price}$</p>
                                    <span className="changeBook" 
                                    onClick={() => this.showChangeBookModal(book.idbooks)}>Изменить</span>
                                    <span className="deleteBook" 
                                    onClick={() => this.deleteBook(book.idbooks)}>Удалить</span>
                                </div> : null
                            }
                        </div>
                    );
                })}
                <div className="pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={this.state.totalItemPerPage}
                      totalItemsCount={this.state.totalItem}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange.bind(this)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
            </div>

            {
                this.state.newBookModal ?
                <div className="newBookModal">
                    <div className="main">
                        <div className="close"
                        onClick={() => this.closeNewBookModal()}>
                            <span className="clos__line"></span>
                        </div>
                        <form>
                            <div className="form-group form__el">
                                <input type="text" 
                                name="title"
                                value={newBook.title}
                                onChange={this.addBookToState}
                                placeholder="Название" />
                            </div>
                            <div className="form-group form__el">
                                <input type="text" 
                                name="type"
                                value={newBook.type}
                                onChange={this.addBookToState}
                                placeholder="Тип" />
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 multiselect">
                                        <Select className="multiselect"
                                        value={newBook.authors}
                                        onChange={this.addToMultiselectValue}
                                        options={authors} isMulti />
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                            </div>
                            <div className="form-group form__el">
                                <textarea 
                                name="description"
                                onChange={this.addBookToState}
                                value={newBook.description}
                                placeholder="Описание"></textarea>
                            </div>
                            <div className="form-group form__el">
                                <input type="number" 
                                name="price"
                                onChange={this.addBookToState}
                                value={newBook.price}
                                placeholder="Цена" />
                            </div>

                            <button type="button"
                            onClick={() => this.addNewBook()}>Добавить</button>
                        </form>
                    </div>
                </div> : null

            }

            {
                this.state.changeBookModal ?
                <div className="modal">
                    <div className="main">
                        <div className="close"
                        onClick={() => this.closeChangeBookModal()}>
                            <span className="clos__line"></span>
                        </div>
                        <form>
                            <div className="form-group form__el">
                                <input type="text" 
                                name="title"
                                value={newBook.title}
                                onChange={this.addBookToState}
                                placeholder="Название" />
                            </div>
                            <div className="form-group form__el">
                                <input type="text" 
                                name="type"
                                value={newBook.type}
                                onChange={this.addBookToState}
                                placeholder="Тип" />
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 multiselect">
                                        <Select className="multiselect"
                                        value={newBook.authors}
                                        onChange={this.addToMultiselectValue}
                                        options={authors} isMulti />
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                            </div>
                            <div className="form-group form__el">
                                <textarea
                                name="description"
                                onChange={this.addBookToState}
                                value={newBook.description} 
                                placeholder="Описание"></textarea>
                            </div>
                            <div className="form-group form__el">
                                <input type="number"
                                name="price"
                                onChange={this.addBookToState}
                                value={newBook.price} 
                                placeholder="Цена" />
                            </div>

                            <button type="button"
                            onClick={() => this.changeBook()}>Изменить</button>
                        </form>
                    </div>
                </div> : null
            }
          </section>
        );
    }
}