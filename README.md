# EcommMobi
Expo with RN + PayarcSDK
The purpose of this app is to make a POC for integration with Payarc's SDK.
The tech stack include React-native (tested on iOs and web) with expo router on ExpoGo.
for backend is used supabase to store data in RDBMS and to store secrets for accessing PAYARC'S API by invoking their apis from the'edge' as functions of supabase. this no secrets are sent to client.
the scenario is ordering some food
upon starting the app if user is new or not loged in a login screen is shown
if needed a new user can be registred with email and password
once user is logedin the menu page is displayed
![Menu page !](/docs/images/menu.jpeg "Menu page")
user can select amons items and adds them to the cart
![Cart page !](/docs/images/cart.jpeg "Cart items")
when user is fine with selection and quantiy he could proceed to checkout
on this page user can select amongs his old addresses (base on past orders stored in supabase)
or could add new address done with Google api integration for prediction
a list of credit cards that belongs to this used is downloaded from payarc's dabase. it is possible to add new cc that is stored only in payarc's db not in supabase 
![Checkout menu !](/docs/images/checkout.jpeg "Checkout")
once payment is started the app returns to the menu
in Payarc the payment could be tracked
![Payarc dashboard](/docs/images/payarc.png "Payarc")