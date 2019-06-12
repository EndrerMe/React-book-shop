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
import IBook from './shared/interfaces/book.interface';
import Registraton from './views/regist/regist';
import ShoppingBag from './views/shoppingBag/shoppingBag';
import Book from './views/bookView/bookView';
import Authors from './views/admin/authors/authors';
import Books from './views/admin/books/books';
import Users from './views/admin/users/users';
// Services
import { BagService } from './shared/services/bag.service';
import { BookService } from './shared/services/book.service';
// Actions
import { booksFetchData } from "./actions/books"
// Guards
import { PrivateRoute } from './shared/guards/privateRote';

const HISTORY = createBrowserHistory()
const bagService = new BagService()
const bookService = new BookService()

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
      activePage: 1,
      totalItemPerPage: 4,
      totalItem: 0,
    };
  }

  STORE = []
  books: [] = []

  componentDidMount(): void {
    bookService.getAllBooks().then((res) => {
      this.setState({
        totalItem: res,
      })
    })

    bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage)
      .then((res) => {
        this.setState({
          data: res
        })
      })

  }

  private addToBag(book: IBook): void {
    bagService.addToBag(book)
  }

  private async handlePageChange(pageNumber: number) {
    await this.setState({activePage: pageNumber});
    bookService.getBookForPage(this.state.activePage, this.state.totalItemPerPage).then((res) => {
      this.setState({
        data: res
      })
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
          <Header></Header>
          <Route path="/all-books" render = { () => 
            {
              return(
                <div className="catalog">
                  {data.map((book: any) => {
                    return (
                      <div className="book" key={book.idbooks}>
                          <h3 className="book__title">{ book.title }</h3>
                          <p className="book__info">{ book.type }</p>
                          <p className="book__price">{ book.price + "$" }</p>
                          <button className="book__buy" onClick={() => this.addToBag(book)}>Добавить в корзину</button>
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
              );
            }
          } />
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
        <div className="auth">
          <Route path="/Registration" render={ () => {
            return(
              <div className="regist">
                <Registraton></Registraton>
              </div>
            );
          } }>
          </Route>
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