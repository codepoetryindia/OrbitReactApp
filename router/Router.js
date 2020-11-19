import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from "../screen/LoginScreen";
//import FingerScreen from '../screen/FingerScreen'
import SplashScreen from "../screen/SplashScreen";
import SignUpScreen from "../screen/SignUpScreen";
import VerifyScreen from "../screen/VerifyScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import BusinessDetailScreen from "../screen/BusinessDetailScreen";
import PersonalDetailScreen from "../screen/PersonalDetailScreen";
import CompanyScreen from "../screen/CompanyScreen";
import CompanyOfficerScreen from "../screen/CompanyOfficerScreen";
import UploadProofScreen from "../screen/UploadProofScreen";
import PreviewScreen from "../screen/PreviewScreen";
import ForgotPasswordScreen from "../screen/ForgotPasswordScreen";
import TabScreen from "../screen/TabScreen/TabScreen";
import ComingSoonScreen from "../screen/ComingSoonScreen";
import PaymentLinkScreen from "../screen/DetailScreen/PaymentLinkScreen";
import HelpScreen from "../screen/SettingScreen/HelpScreen";
import SettingScreen from "../screen/SettingScreen/SettingScreen";
import PasswordScreen from "../screen/SettingScreen/PasswordScreen";
import ChangePinScreen from "../screen/SettingScreen/ChangePinScreen";
import TermsAndConditionScreen from "../screen/SettingScreen/TermsAndConditionScreen";
import FaqScreen from "../screen/SettingScreen/FaqScreen";
import PrivacyScreen from "../screen/SettingScreen/PrivacyScreen";
import AccountHelpScreen from "../screen/SettingScreen/AccountHelpScreen";
import HelpAccountScreen from "../screen/SettingScreen/HelpAccountScreen";
import HelpAnylaticsScreen from "../screen/SettingScreen/HelpAnalyticsScreen";
import IssueScreen from "../screen/SettingScreen/IssueScreen";
import ChattingScreen from "../screen/Message/ChattingScreen";
import MessageScreen from "../screen/Message/MessageScreen";
import BiometricScreen from "../screen/BiometricScreen";
import NaxetraAccount from "../screen/DetailScreen/NaxetraAccount";
import BankAccount from "../screen/DetailScreen/BankAccount";
import ConfirmScreen from "../screen/DetailScreen/ConfirmScreen";
import TransferScreen from "../screen/DetailScreen/TransferScreen";
import LinkSuccessScreen from "../screen/DetailScreen/LinkSuccessScreen";
import AddBeneficiaryScreen from "../screen/DetailScreen/AddBeneficiaryScreen";
import ManageBeneficiary from "../screen/DetailScreen/ManageBeneficiary";
import AddMoneyScreen from "../screen/DetailScreen/AddMoneyScreen";
import SelectMoneyScreen from "../screen/DetailScreen/SelectMoneyScreen";
import VerfiyNumberScreen from "../screen/DetailScreen/VerfiyNumberScreen";
import ActivityScreen from "../screen/ActivityScreen";
import RequestDebitCardScreen from "../screen/DetailScreen/RequestDebitCardScreen";
import TicketScreen from "../screen/SettingScreen/TicketScreen";
import PersonalSettingScreen from "../screen/SettingScreen/PersonalSettingScreen";
import AccountSettingScreen from "../screen/SettingScreen/AccountSettingScreen";
import PriceSettingScreen from "../screen/SettingScreen/PriceSettingScreen";
import CardDetailScreen from "../screen/DetailScreen/CardDetailScreen";
import PinCodeScreen from "../screen/DetailScreen/PinCodeScreen";
import ConfirmAddressScreen from "../screen/DetailScreen/ConfirmAddressScreen";
import ViewAllScreen from "../screen/DetailScreen/ViewAllScreen";
import PdfScreen from "../screen/DetailScreen/PdfScreen";
import ConfrimPaymentScreen from "../screen/DetailScreen/ConfirmPaymentScreen";
import Chat from "../screen/Chats/Chat";
import MyWebView from "../screen/Chats/MyWebView";
import ViewPicScreen from "../screen/DetailScreen/ViewPicScreen";
import CompanyDetail from "../screen/SettingScreen/CompanyDetail";

import CRMListScreen from "../screen/CRM/CRMListScreen";
import CreateCRMScreen from "../screen/CRM/CreateCRMScreen";
import ActiveScreen from "../screen/CRM/ActiveScreen";
import CRMCallScreen from "../screen/CRM/CRMCallScreen";
import DetailCRMScreen from "../screen/CRM/DetailCRMScreen";

//Account Screen
import AccountTabScreen from "../screen/Accounts/AccountTabScreen";
import AddProduct from "../screen/Accounts/Component/AddProduct";
import CreateProduct from "../screen/Accounts/Component/CreateProduct";

//Chat Screen
import VendorEdit from "../screen/Chats/VendorEdit";
import PurchaseProducts from "../screen/Chats/PurchaseProducts";
import SaleProducts from "../screen/Chats/SaleProducts";

import AddMoney from "../screen/DetailScreen/AddMoney";

// import BillPayment from '../screen/Accounts/Component/BillPayment'


// Details Screens added to fix back button issue
import CardDetail from "../screen/TabScreen/DetailScreen/CardDetail";
import CategoryDetail from "../screen/TabScreen/DetailScreen/CategoryDetail";
import BeneficiaryTransactions from "../screen/TabScreen/DetailScreen/BeneficiaryTransactions";

import SaleInvoices from "../screen/DetailScreen/SaleInvoices";
import InvoiceEdit from '../screen/AccountsTabScreen/InvoiceEdit'; 
import DashboardTab from "../screen/AccountsTabScreen/DashboardTab";
import InvoicesTab from "../screen/AccountsTabScreen/InvoicesTab";
import CustomersTab from "../screen/AccountsTabScreen/CustomersTab";
import BillsTab from "../screen/AccountsTabScreen/BillsTab";
import SettingTab from "../screen/AccountsTabScreen/SettingTab";
import InvoiceAdd from "../screen/AccountsTabScreen/InvoiceAdd";
import PaymentTerms from "../screen/AccountsTabScreen/PaymentTerms";
import Products from "../screen/AccountsTabScreen/Products";
import AddAccountProduct from "../screen/AccountsTabScreen/AddAccountProduct";
import CustomersList from "../screen/AccountsTabScreen/CustomersList";
import AddItem from "../screen/AccountsTabScreen/AddItem";
import AddCustomers from "../screen/AccountsTabScreen/AddCustomers";
import SideMenuComponentTab from "../components/SideMenuComponentTab";
import Ionicons from 'react-native-vector-icons/Ionicons';
import global_style, { metrics } from "../constants/GlobalStyle";
import * as Colors from "../constants/Colors";






    /*Added for invoice upgrade*/      
    const AccountsNavigator = createBottomTabNavigator({
      DashboardTab:{
        screen:DashboardTab,         navigationOptions: {
          tabBarLabel: 'Dashboard', 
          tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-apps" color={tintColor} size={25*metrics} />
          )
      }
     },
      SaleInvoices:{
        screen:InvoicesTab,         
        navigationOptions: {
          tabBarLabel: 'Sale Invoice', 
          tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-clipboard" color={tintColor} size={25*metrics} />
          )
      }
     },
     CustomersTab:{
          screen:CustomersTab,         navigationOptions: {
            tabBarLabel: 'Customers', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-people" color={tintColor} size={25*metrics} />
            )
        }
      },
      BillsTab:{
          screen:BillsTab,         navigationOptions: {
            tabBarLabel: 'Bills', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-document" color={tintColor} size={25*metrics} />
            )
        }
      },
      SettingTab:{
        screen:SettingTab,         navigationOptions: {
          tabBarLabel: 'Settings', 
          tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-settings" color={tintColor} size={25*metrics} />
          )
      }
      }     
    },  {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
            IconComponent = HomeIconWithBadge;
          } else if (routeName === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }
  
          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: Colors.main_color,
        inactiveTintColor: 'gray',
      },
    });

    const Drawer = createDrawerNavigator({
      home: AccountsNavigator
    }, {
      initialRouteName: 'home',
      contentComponent: SideMenuComponentTab,
      // drawerWidth: 300    
    });


const AppNavigator = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SplashScreen: { screen: SplashScreen },
    SignUpScreen: { screen: SignUpScreen },
    VerifyScreen: { screen: VerifyScreen },
    WelcomeScreen: { screen: WelcomeScreen },
    PersonalDetail: { screen: PersonalDetailScreen },
    BusinessDetail: { screen: BusinessDetailScreen },
    CompanyScreen: { screen: CompanyScreen },
    CompanyOfficer: { screen: CompanyOfficerScreen },
    UploadProof: { screen: UploadProofScreen },
    PreviewScreen: { screen: PreviewScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    TabScreen: { screen: TabScreen },
    ComingSoonScreen: { screen: ComingSoonScreen },
    PaymentLinkScreen: { screen: PaymentLinkScreen },
    HelpScreen: { screen: HelpScreen },
    SettingScreen: { screen: SettingScreen },
    PasswordScreen: { screen: PasswordScreen },
    ChangePinScreen: { screen: ChangePinScreen },
    TermScreen: { screen: TermsAndConditionScreen },
    FaqScreen: { screen: FaqScreen },
    PrivacyScreen: { screen: PrivacyScreen },
    AccountHelpScreen: { screen: AccountHelpScreen },
    HelpAccountScreen: { screen: HelpAccountScreen },
    TicketScreen: { screen: TicketScreen },
    HelpAnalyticsScreen: { screen: HelpAnylaticsScreen },
    IssueScreen: { screen: IssueScreen },
    MessageScreen: { screen: MessageScreen },
    ChattingScreen: { screen: ChattingScreen },
    BiometricScreen: { screen: BiometricScreen },
    NaxetraAccount: { screen: NaxetraAccount },
    BankAccount: { screen: BankAccount },
    ConfirmScreen: { screen: ConfirmScreen },
    TransferScreen: { screen: TransferScreen },
    LinkSuccessScreen: { screen: LinkSuccessScreen },
    AddBeneficiaryScreen: { screen: AddBeneficiaryScreen },
    ManageBeneficiary: { screen: ManageBeneficiary },
    AddMoneyScreen: { screen: AddMoneyScreen },
    SelectMoneyScreen: { screen: SelectMoneyScreen },
    VerfiyNumberScreen: { screen: VerfiyNumberScreen },
    ActivityScreen: { screen: ActivityScreen },
    RequestDebitCardScreen: { screen: RequestDebitCardScreen },
    AccountSettingScreen: { screen: AccountSettingScreen },
    PersonalSettingScreen: { screen: PersonalSettingScreen },
    PriceSettingScreen: { screen: PriceSettingScreen },
    CardDetailScreen: { screen: CardDetailScreen },
    PinCodeScreen: { screen: PinCodeScreen },
    ConfirmAddressScreen: { screen: ConfirmAddressScreen },
    ViewAllScreen: { screen: ViewAllScreen },
    PdfScreen: { screen: PdfScreen },
    ConfrimPaymentScreen: { screen: ConfrimPaymentScreen },
    Chat: { screen: Chat },
    MyWebView: { screen: MyWebView },
    ViewPicScreen: { screen: ViewPicScreen },
    CRMListScreen: { screen: CRMListScreen },
    CreateCRMScreen: { screen: CreateCRMScreen },
    ActiveScreen: { screen: ActiveScreen },
    CRMCallScreen: { screen: CRMCallScreen },
    DetailCRMScreen: { screen: DetailCRMScreen },
    //Account Screen
    AccountTabScreen: { screen: AccountTabScreen },
    AddProduct: { screen: AddProduct },
    VendorEdit: { screen: VendorEdit },
    PurchaseProducts: { screen: PurchaseProducts },
    SaleProducts: { screen: SaleProducts },
    CreateProduct: { screen: CreateProduct },
    AddMoney: { screen: AddMoney },
    // BillPayment : { screen : BillPayment }

    CompanyDetail: { screen: CompanyDetail },
    /*Added Later to fix back button issue*/
    CardDetail:{screen:CardDetail},
    CategoryDetail:{screen:CategoryDetail},
    BeneficiaryTransactions:{screen:BeneficiaryTransactions},
    InvoiceAdd:{screen:InvoiceAdd},
    PaymentTerms:{screen:PaymentTerms},
    Products:{screen:Products},
    AddAccountProduct:{screen:AddAccountProduct},
    CustomersList:{screen:CustomersList},
    AddItem:{screen:AddItem},
    AddCustomers:{screen:AddCustomers},
    InvoiceEdit:{screen:InvoiceEdit,navigationOptions:{
      headerShown: false
    }},
    Lolscreen : {
      screen : Drawer,
      navigationOptions: {
        header: null
     }
   },
  },
  {
    initialRouteName: "SplashScreen",
    navigationOptions: {
      headerLeft: null,
    },
  }
);


const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
