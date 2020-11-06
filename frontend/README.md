Angular test books

Angular application that allows to view, search update books and checkouts

### Libraries 
Library used:
 ngx-easy-table - for view table  source: https://github.com/ssuperczynski/ngx-easy-table
 angular2-notifications - notifications and alerts
 ngx-translate/core - translations

### Structure

  components/
    
     book-detail / - book detail with update, delete options
     books-list / - books table
     favourite-books / - table for books that were added to favourites
     checkout-list / - checkouts
     checkout-detail - checkout detail with update, delete options
   
  models - models and types
  services - angular services
  
  shared / - utility common tools
    services/
       notificationService - notify service
       
   checkout 
     check if checkout is late -> press > arrow button in checkout list   
       
  Additional features:   
    translations 
      are in assets / i18n / en
 
    favourites 
       remove from favourites - happens on item click  
          
          
### Test
npm run test

### Build 
npm run build

### Run
Use command npm run start to start localhost:4200
localhost:8080 is for this app backend
