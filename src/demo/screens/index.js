import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import AlbumScreen from './AlbumScreen';
import ListScreen from './ListScreen';
import HomeScreen from './HomeScreen';
import Notification from './Notification';
import AccountSetting from './AccountSetting';
import CollapsingHeader from './CollapsingHeader';
import ComponentsScreen from './ComponentsScreen';
import TabOne from './components/tabs/TabOne';
import TabTwo from './components/tabs/TabTwo';
import FormScreen from './FormScreen';
import SignatureScreen from './SignatureScreen';
import SearchScreen from './SearchScreen';
import TabMenuScreen from './TabMenuScreen';
import TimelineScreen from './TimelineScreen';
import ChartScreen from './ChartScreen';
import TopTabsScreen from './TopTabsScreen';
import DropdownMenuScreen from './DropdownMenuScreen';
import ContactScreen from './ContactScreen';
import SCIScreen from './SCIScreen';

import C4CModuleListScreen from './C4CModuleListScreen';
import C4CContactScreen from './C4C/ContactScreen';
import C4CLeadScreen from './C4C/LeadScreen';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('demo.LoginScreen', () => LoginScreen, store, Provider);
    Navigation.registerComponent('demo.HomeScreen', () => HomeScreen, store, Provider);
    Navigation.registerComponent('demo.ComponentsScreen', () => ComponentsScreen, store, Provider);

    Navigation.registerComponent('demo.Notification', () => Notification, store, Provider);
    Navigation.registerComponent('demo.AccountSetting', () => AccountSetting, store, Provider);
    Navigation.registerComponent('demo.CollapsingHeader', () => CollapsingHeader, store, Provider);
    Navigation.registerComponent('demo.AlbumScreen', () => AlbumScreen, store, Provider);
    Navigation.registerComponent('demo.ListScreen', () => ListScreen, store, Provider);
    Navigation.registerComponent('demo.ChartScreen', () => ChartScreen, store, Provider);
    Navigation.registerComponent('demo.TopTabsScreen', () => TopTabsScreen, store, Provider);
    Navigation.registerComponent('demo.DropdownMenuScreen', () => DropdownMenuScreen, store, Provider);
    Navigation.registerComponent('demo.ContactScreen', () => ContactScreen, store, Provider);
    Navigation.registerComponent('demo.SCIScreen', () => SCIScreen, store, Provider);

    Navigation.registerComponent('demo.FormScreen', () => FormScreen, store, Provider);
    Navigation.registerComponent('demo.SearchScreen', () => SearchScreen, store, Provider);
    Navigation.registerComponent('demo.TabMenuScreen', () => TabMenuScreen, store, Provider);
    Navigation.registerComponent('demo.SignatureScreen', () => SignatureScreen, store, Provider);
    Navigation.registerComponent('demo.TimelineScreen', () => TimelineScreen, store, Provider);

    Navigation.registerComponent('demo.components.tabs.TabOne', () => TabOne, store, Provider);
    Navigation.registerComponent('demo.components.tabs.TabTwo', () => TabTwo, store, Provider);

    Navigation.registerComponent('demo.C4CModuleListScreen', () => C4CModuleListScreen, store, Provider);
    Navigation.registerComponent('demo.C4C.ContactScreen', () => C4CContactScreen, store, Provider);
    Navigation.registerComponent('demo.C4C.LeadScreen', () => C4CLeadScreen, store, Provider);
}
