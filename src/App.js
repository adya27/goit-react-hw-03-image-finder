import "./App.css";
import "./styles.css";
import React, { PureComponent } from "react";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";

class App extends PureComponent {
  state = {
    match: [],
    showModal: false,
    currentImg: "",
    page: 1,
    search: "",
    status: "idle",
  };

  componentDidMount() {
    this.setState(() => {
      return { page: 1, match: [] };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStateSearch = prevState.search;
    if (prevStateSearch !== this.state.search) {
      this.setState(() => {
        return { page: 1, match: [] };
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (
      this.state.page !== 1 &&
      prevState.showModal === this.state.showModal
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  notify = () => toast.error("Sorry, no matches :(");

  onSubmit = (data, page) => {
    this.setState((s) => {
      return { status: "pending", search: data };
    });

    fetch(
      `https://pixabay.com/api/?key=17537629-2ee3a1e1cfb1c48a1e1039472&q=${data}&image_type=photo&pretty=true&page=${page}&per_page=12`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.total === 0) {
          this.setState(() => {
            return { status: "rejected" };
          });
          this.notify();
        }
        return data;
      })
      .then((data) =>
        this.setState((s) => {
          return { match: [...s.match, ...data.hits], status: "idle" };
        })
      );
  };

  toggleModal = () => {
    this.setState(() => {
      return { showModal: !this.state.showModal };
    });
  };

  incrementPage() {
    this.setState((s) => {
      return { page: s.page + 1 };
    });
  }

  loadMore = () => {
    this.incrementPage();

    this.onSubmit(this.state.search, this.state.page + 1);
  };

  onClick = (data) => {
    this.setState({ currentImg: data });
    this.toggleModal();
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        <ToastContainer />

        <ImageGallery onClick={this.onClick} match={this.state.match} />

        {this.state.status === "pending" && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}

        {this.state.showModal && (
          <Modal
            closeModal={this.toggleModal}
            largeImageURL={this.state.currentImg}
          />
        )}
        {this.state.match.length % 12 === 0 &&
          this.state.match.length !== 0 &&
          this.state.status !== "pending" && (
            <Button loadMore={this.loadMore} />
          )}
      </div>
    );
  }
}

export default App;
