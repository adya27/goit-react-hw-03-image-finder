import "./App.css";
import "./styles.css";
import React, { PureComponent } from "react";
import Loader from "react-loader-spinner";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

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

  componentDidUpdate(prevProps, prevState) {
    const prevStateSearch = prevState.search;
    if (prevStateSearch !== this.state.search) {
      this.setState({ page: 1 });

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

  onSubmit = async (data) => {
    await this.setState({ status: "pending" });
    await this.setState({ search: data });
    await fetch(
      `https://pixabay.com/api/?key=17537629-2ee3a1e1cfb1c48a1e1039472&q=${data}&image_type=photo&pretty=true&page=1&per_page=${
        this.state.page * 12
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.total === 0) {
          this.setState({ status: "rejected" });
          NotificationManager.error("No matches founded", "404", 3000);
        }
        return data;
      })
      .then((data) => this.setState({ match: data.hits }));
    await this.setState({ status: "idle" });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  loadMore = async () => {
    await this.setState((prev) => {
      return { page: prev.page + 1 };
    });
    await this.onSubmit(this.state.search);
  };

  onClick = (data) => {
    this.setState({ currentImg: data });
    this.toggleModal();
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        <NotificationContainer />

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
