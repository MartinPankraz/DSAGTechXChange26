namespace sap.lunch;

entity LunchOrders {
  key ID            : UUID;
  employeeName      : String(100);
  mealType          : String(100);
  dietaryRestrictions : String(200);
  quantity          : Integer default 1;
  orderDate         : Date;
  status            : String(50) default 'pending';
}

entity MenuItems {
  key ID          : UUID;
  name            : String(100);
  description     : String(200);
  category        : String(50);
  available       : Boolean default true;
}