// Vendors
import React from 'react';
import { Router, Route, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

// Style
import './App.scss';
// Components
import Header from './shared/components/header/header';
import Login from './views/login/login';
import Registraton from './views/regist/regist';
import ShoppingBag from './views/shoppingBag/shoppingBag';
import Book from './views/bookView/bookView';
import Authors from './views/admin/authors/authors';
import Books from './views/admin/books/books';
import Users from './views/admin/users/users';
// Services
import { BagService, BookService } from './shared/services';
// Actions
import { booksFetchData } from "./actions/books"
// Guards
import { PrivateRoute } from './shared/guards';
// Interfaces 
import { IBook } from './shared/interfaces';

const HISTORY = createBrowserHistory();
const bagService = new BagService();
const bookService = new BookService();

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      activePage: 1,
      totalItemPerPage: 4,
      totalItem: 0,

      searchByBookTitle: null,
      searchByAuthorName: null,
      searchByType: null,
      searchByPrice: {
        min: null,
        max: null,
      },

      isShowFilter: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  STORE = [];
  books: [] = [];

  componentDidMount() {
    bookService.getAllBooks().then((res) => {
      this.setState({
        totalItem: res,
      });
    });

    bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage)
      .then((res) => {
        this.setState({
          data: res,
        });
      });
  };

  private onChangeInput(event: any): void {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === "min" || name === "max") {
      this.setState((prevState: any) => ({
        searchByPrice: {
            ...prevState.searchByPrice,
            [name]: value,
        },
      }));
    } else {
      this.setState({
        [name]: value,
      });
    };
  };

  private addToBag(book: IBook): void {
    bagService.addToBag(book);
  };

  private async handlePageChange(pageNumber: number): Promise<void> {
    await this.setState({activePage: pageNumber});
    bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
      this.setState({
        data: res,
      });
    });
  };

  private searchByBookTitle(): void{
    let title = this.state.searchByBookTitle;

    bookService.findByTitle(title).then((res) => {
      this.books = [];

      let books = res;
      this.setState({
        data: books,
      });
    });
  };

  private seacrhByAuthor(): void {
    let author = this.state.searchByAuthorName;

    bookService.findByAuthor(author).then((res) => {
      this.books = [];

      let books = res;
      let data: IBook[] = [];

      for (let i = 0; i < books.length; i++) {
        data.push(books[i].Book as any);
      };

      this.setState({
        data: data,
      });
    });
  };

  private searchByType(): void {
    let type = this.state.searchByType;

    bookService.findByType(type).then((res) => {
      this.books = [];

      let books = res;

      this.setState({
        data: books,
      });
    });
  };

  private searchByPrice(): void {
    let price = this.state.searchByPrice;

    bookService.findByPrice(price).then((res) => {
      this.books = [];

      let books = res;

      this.setState({
        data: books,
      });
    });
  };

  private toogleFilter(): void {
    this.setState({
      isShowFilter: !this.state.isShowFilter
    })
  }

  public render() { 
    const { data } = this.state;
    return(
      <Router history={HISTORY}>
        <Route exact path="/" render={() => (
          <Redirect to="/all-books"/>
        )}/>
        <div className="mainLayout">       
          <Route path="/all-books" render = { () => 
            {
              return(
                <div className="mainPage">
                  <Header></Header>
                    <div className="accordion">
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button className="btn btn-link" 
                            data-toggle="collapse" 
                            data-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne"
                            onClick={() => this.toogleFilter()}>
                              {
                                this.state.isShowFilter ?
                                'Hide filters'
                                : 'Show filters'
                              }
                            </button>
                          </h5>
                        </div>

                        {
                          this.state.isShowFilter ?
                          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                              
                              <div className="filter">
                                <div className="filter__search">
                                  <div className="filter__main">
                                    <div className="group">
                                      <input type="text" 
                                      name="searchByBookTitle"
                                      value={this.state.searchByBookTitle || ""}
                                      onChange={this.onChangeInput} required/>
                                      <span className="bar"></span>
                                      <label>Название</label>
                                    </div>
                                    <button
                                    className="btn-primary btn btnSearch"
                                    onClick={() => this.searchByBookTitle()}>Поиск</button>
                                  </div>
                                  <div className="filter__main">
                                    <div className="group">
                                      <input type="text" 
                                      name="searchByAuthorName"
                                      value={this.state.searchByAuthorName || ""}
                                      onChange={this.onChangeInput} required/>
                                      <span className="bar"></span>
                                      <label>Автор</label>
                                    </div>
                                    <button
                                    className="btn-primary btn btnSearch"
                                    onClick={() => this.seacrhByAuthor()}>Поиск</button>
                                  </div>
                                  <div className="filter__main">
                                    <div className="group">
                                      <input type="text" 
                                      name="searchByType"
                                      value={this.state.searchByType || ""}
                                      onChange={this.onChangeInput} required/>
                                      <span className="bar"></span>
                                      <label>Тип</label>
                                    </div>
                                    <button
                                    className="btn-primary btn btnSearch"
                                    onClick={() => this.searchByType()}>Поиск</button>
                                  </div>
                                </div>
                                <form className="filter__price">
                                  <div className="group">
                                    <input type="number" 
                                    name="min" 
                                    value={this.state.searchByPrice.min || ""}
                                    onChange={this.onChangeInput} required/>
                                    <span className="bar"></span>
                                    <label>Минимальная</label>
                                  </div>
                                  <div className="group">  
                                    <input type="number" 
                                    name="max" 
                                    value={this.state.searchByPrice.max || ""}
                                    onChange={this.onChangeInput} required/>
                                    <span className="bar"></span>
                                    <label>Максимальная</label>
                                  </div>
                                  
                                  <button className="btn btn-primary btnSearchPrice" type="button"
                                  onClick={() => this.searchByPrice()}> Поиск </button>
                                </form>

                                <div className="clearFilter">
                                  <button 
                                  className="btn-danger btn"
                                  onClick={() => this.componentDidMount()}>Сброс фильтров</button>
                                </div>

                              </div>
                            </div>
                          </div> 
                          : null
                        }
                      </div>
                    </div>
                  <div className="catalog">
                    {data.map((book: any) => {
                      return (
                        <div className="book" key={book.idbooks}>
                            <h3 className="book__title">{ book.title }</h3>
                            <p className="book__info">{ book.type }</p>
                            <p className="book__price">{ book.price + "$" }</p>
                            <button className="btn btn-primary bookBuy" onClick={() => this.addToBag(book)}>Добавить в корзину</button>
                            <Link className="showBook" to={`/book/` + book.idbooks}>
                                <h3 className="showBook__title">Показать</h3>
                            </Link>
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
                </div>
              );
            }
          } />     
        </div>
        <div className="auth">
          <Route path="/Registration" render={ () => {
            return(
              <div className="regist">
                <Registraton></Registraton>
              </div>
            );
          } }>
          </Route>
          <Route path="/Login" render={ () => 
            {
              return(
                <div className="login">
                  <Login></Login>
                </div>
              );
            } 
          } />  
        </div>
        <div className="bag">
          {/* <PrivateRoute path="/Shopping-bag" component={ShoppingBag} /> */}
          <Route path="/Shopping-bag" render={ () => {
              return(
                <ShoppingBag></ShoppingBag>
              );
            } }>
          </Route>
        </div>
        <div className="adminBuns">
          <Header></Header>
          <PrivateRoute path="/adminBuns/Authors" component={Authors} />
          <PrivateRoute path="/adminBuns/Books" component={Books} />
          <PrivateRoute path="/adminBuns/Users" component={Users} />
        </div>
        <Route path="/book/:id" component={Book}>
        </Route>
      </Router>  
    );
  }
}
const mapStateToProps = (state: any) => {
  return {response: state};
}

const mapDisatchToProps = (dispatch: any) => {
  return {
    fetchData: (url: any) => {dispatch(booksFetchData(url))}
  };
}
export default connect (mapStateToProps, mapDisatchToProps)(App);