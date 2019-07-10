// Vendors
import React from "react";
import Pagination from "react-js-pagination";

// Style
import "./authors.scss"
// Services
import { AuthorService } from "../../../shared/services";
// Interfaces
import { IAuthor } from "../../../shared/interfaces";

const authorService = new AuthorService();

export default class Authors extends React.Component<any, any> {

    constructor (props: null) {
        super(props)
        this.state = {
            addNewAuthorModal: false,
            authorInfo: null,
            changeAuthorModal: false,

            authors: [],

            newAuthor: {
                authorName: "",
            },

            idOfChangedAuthors: null,
            activePage: 1,
            totalItemPerPage: 4,
            totalItem: 0,
        };

        this.onChangeInput = this.onChangeInput.bind(this);
    };

    componentDidMount() {
        authorService.getAllAuthorsLength().then((res) => {
            this.setState({
                totalItem: res,
            });
        });

        authorService.getAuthorsForPage(this.state.activePage, this.state.totalItemPerPage)
        .then((res) => {
            this.setState({
                authors: res,
            });
        });
    };

    private onChangeInput(event: any): void {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            newAuthor: {
                [name]: value,
            },
        });
    };

    private addNewAuthorModal(): void {
        this.setState ({
            addNewAuthorModal: true,
        });
    };

    private closeAddNewAuthor(): void {
        this.setState ({
            addNewAuthorModal: false,
        });
    };

    private showAuthorInfo(author: IAuthor): void {

        if (this.state.authorInfo === author.idauthors) {
            this.setState({
                authorInfo: null,
            });
            return;
        };
        
        this.setState ({
            authorInfo: author.idauthors,
        });
    };

    private showModalChangeAuthor(author: IAuthor): void {
        this.setState ({
            changeAuthorModal: true,
            idOfChangedAuthors: author.idauthors,
        });
    };

    private closeModalChangeAuthor(): void {
        this.setState ({
            changeAuthorModal: false,
        });
    };

    private addNewAuthor(): void {
        let authors = this.state.authors;
        let newAuthor = this.state.newAuthor;

        authorService.addNewAuthor(newAuthor);

        authors.push(newAuthor);
        this.setState({
            authors: authors,
            addNewAuthorModal: false,
        });
    };

    private deleteAuthor(author: IAuthor): void {
        let authors = this.state.authors;
        authorService.deleteAuthor(author);
        for (let i = 0; i < authors.length; i++) {
            if (author.idauthors === authors[i].idauthors) {
                authors.splice(i, 1);
                this.setState({
                    authors: authors,
                });
            };
        };
    };

    private changeAuthor(): void {
        let author = this.state.newAuthor;
        let authors = this.state.authors;
        author.idauthors = this.state.idOfChangedAuthors;
        authorService.changeAuthor(author);
        
        for(let i = 0; i < authors.length; i++) {
            if (author.idauthors === authors[i].idauthors) {
                authors[i] = author;
                this.setState({
                    authors: authors,
                    changeAuthorModal: false,
                });
            };
        };
    };

    private async handlePageChange(pageNumber: number): Promise<void> {
        await this.setState({activePage: pageNumber});
        authorService.getAuthorsForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
          this.setState({
            authors: res,
          });
        });
      };


    public render () {
        let authors = this.state.authors;
        return (
            <section className="editAuthors">
                    <button type="button"  
                    onClick={() => this.addNewAuthorModal()}
                    className="btn btn-info">Добавить автора</button>
                    <div className="allAuthors">
                        {authors.map((author: any) => {
                            return (
                                <div key={author.idauthors}>
                                    <div className="author">
                                        <h4 className="author__name">{author.authorName}</h4>
                                        {
                                            this.state.authorInfo === author.idauthors ?
                                            
                                            <span className="author__Show"
                                            onClick={() => this.showAuthorInfo(author)}>
                                            Скрыть</span>
                                            :
                                            <span className="author__Show"
                                            onClick={() => this.showAuthorInfo(author)}>
                                            Показать</span>

                                        }
                                    </div>
                                    {
                                        this.state.authorInfo === author.idauthors ?
                                        <div className="authorInfo">
                                            <span className="changeAuthor"
                                            onClick={() => this.showModalChangeAuthor(author)}>Изменить</span>
                                            <span className="deleteAuthor"
                                            onClick={() => this.deleteAuthor(author)}>Удалить</span>
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
                        this.state.addNewAuthorModal ?
                        <div className="modal">
                            <div className="main">
                                <div className="close"
                                onClick={() => this.closeAddNewAuthor()}>
                                <span className="clos__line"></span>
                                </div>
                                <div className="form-group form__el modalAuthorName">
                                    <input type="text" name="authorName"
                                    value = {this.state.newAuthor.authorName}
                                    onChange={this.onChangeInput}
                                    placeholder="Имя автора" />
                                    <button type="submit"
                                    onClick={() => this.addNewAuthor()}>Добавить</button>
                                </div>
                            </div>
                        </div> : null
                    }

                    {
                        this.state.changeAuthorModal ?
                        <div className="changeAuthorName">
                            <div className="main">
                                <div className="close"
                                onClick={() => this.closeModalChangeAuthor()}>
                                    <span className="clos__line"></span>
                                </div>
                                <div className="form-group form__el modalAuthorName">
                                    <input type="text" placeholder="Имя автора"
                                    name="authorName"
                                    value = {this.state.newAuthor.authorName}
                                    onChange={this.onChangeInput} />
                                    <button type="submit"
                                    onClick={() => this.changeAuthor()}>Изменить</button>
                                </div>
                            </div>
                        </div> : null
                    }
            </section>
        );
    }
}