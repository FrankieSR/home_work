(function() {
  let productsList = [];
  let request = new XMLHttpRequest();
  request.open("GET", "https://5b165eaba1c7e300147c8724.mockapi.io/products");

  request.onload = function() {
    if (this.status == 200) {
      let response = JSON.parse(this.responseText);
      for (var i = 1; i < Object.keys(response[0]).length; i++) {
        productsList.push(response[0][i]);
      }
    } else {
      console.log("error");
    }

    //-------------------------- Controller  ------------------------------

    class Controller {
      constructor(productsList) {
        this.jsonList = productsList;
      }

      getData() {
        return this.jsonList;
      }

      sortData() {}

      changeData() {}
    }

    //--------------------------  ViewModel  --------------------------------

    class ViewModel {
      constructor(control) {
        let self = this;
        this.control = control;
        this.data = this.getData();
        this.products = ko.observableArray(this.data);
        this.pageCount = ko.observable(5);
        this.nextPage();
        this.getProductCount = ko.observable(()=>{
          return this.pageCount = 10;
        });
      }

      visibilityOnPAge() {
        for (var i = 0; i < this.products().length; i++) {
          this.products()[i].visibility = false;
            console.log(this.products()[i].visibility);
        }
      }

      nextPage() {
        this.visibilityOnPAge();
        for (var i = 0; i < this.pageCount(); i++) {
          this.products()[i].visibility = true;
        }
      }

      sortNameAZ() {
        this.pageCount = this.products().length;
        this.products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }

      sortNameZA() {
        this.pageCount = this.products().length;
        this.products.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }

      sortPrice() {
        this.pageCount = this.products().length;
        this.products.sort((a, b) => {
          return b.price - a.price;
        });
        this.count = true;
      }

      sortPriceMin() {
        this.pageCount = this.products().length;
        this.products.sort((a, b) => {
          return a.price - b.price;
        });
      }

      getData() {
        return contr.getData();
      }

      getProductsLength() {
        console.log(this.data.length);
        return this.data.length;
      }
    }

    let contr = new Controller(productsList);
    ko.applyBindings(new ViewModel(contr));
  };

  request.send(null);
})(this);
