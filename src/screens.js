import { Navigation } from 'react-native-navigation';

//Demo Screen
import DemoLoginScreen from './demo/screens/LoginScreen';
import DemoAlbumScreen from './demo/screens/AlbumScreen';
import DemoListScreen from './demo/screens/ListScreen';
import DemoHomeScreen from './demo/screens/HomeScreen';
import DemoNotification from './demo/screens/Notification';
import DemoAccountSetting from './demo/screens/AccountSetting';
import DemoCollapsingHeader from './demo/screens/CollapsingHeader';
import DemoComponentsScreen from './demo/screens/ComponentsScreen';
import DemoTabOne from './demo/screens/components/tabs/TabOne';
import DemoTabTwo from './demo/screens/components/tabs/TabTwo';
import DemoFormScreen from './demo/screens/FormScreen';
import DemoSignatureScreen from './demo/screens/SignatureScreen';
import DemoSearchScreen from './demo/screens/SearchScreen';
import DemoTabMenuScreen from './demo/screens/TabMenuScreen';
import DemoTimelineScreen from './demo/screens/TimelineScreen';
import DemoChartScreen from './demo/screens/ChartScreen';
import DemoTopTabsScreen from './demo/screens/TopTabsScreen';
import DemoDropdownMenuScreen from './demo/screens/DropdownMenuScreen';
import DemoContactScreen from './demo/screens/ContactScreen';
import DemoSCIScreen from './demo/screens/SCIScreen';
import DemoC4CModuleListScreen from './demo/screens/C4CModuleListScreen';
import DemoC4CContactScreen from './demo/screens/C4C/ContactScreen';
import DemoC4CLeadScreen from './demo/screens/C4C/LeadScreen';

//Development Screen
import StartScreen from './StartScreen';
import HomeScreen from './application/screens/HomeScreen';
import CustomerListScreen from './application/screens/CustomerListScreen';

import CluesScreen from './application/screens/CluesScreen';
import CreateClueScreen from './application/screens/CreateClueScreen';
import ClueDetailScreen from './application/screens/ClueDetailScreen';

import UserProfileScreen from './application/screens/UserProfileScreen';

import SelectModal from './application/screens/SelectModal';
export function registerScreens(store, Provider) {
    Navigation.registerComponent('demo.LoginScreen', () => DemoLoginScreen, store, Provider);
    Navigation.registerComponent('demo.HomeScreen', () => DemoHomeScreen, store, Provider);
    Navigation.registerComponent('demo.ComponentsScreen', () => DemoComponentsScreen, store, Provider);
    Navigation.registerComponent('demo.Notification', () => DemoNotification, store, Provider);
    Navigation.registerComponent('demo.AccountSetting', () => DemoAccountSetting, store, Provider);
    Navigation.registerComponent('demo.CollapsingHeader', () => DemoCollapsingHeader, store, Provider);
    Navigation.registerComponent('demo.AlbumScreen', () => DemoAlbumScreen, store, Provider);
    Navigation.registerComponent('demo.ListScreen', () => DemoListScreen, store, Provider);
    Navigation.registerComponent('demo.ChartScreen', () => DemoChartScreen, store, Provider);
    Navigation.registerComponent('demo.TopTabsScreen', () => DemoTopTabsScreen, store, Provider);
    Navigation.registerComponent('demo.DropdownMenuScreen', () => DemoDropdownMenuScreen, store, Provider);
    Navigation.registerComponent('demo.ContactScreen', () => DemoContactScreen, store, Provider);
    Navigation.registerComponent('demo.SCIScreen', () => DemoSCIScreen, store, Provider);
    Navigation.registerComponent('demo.FormScreen', () => DemoFormScreen, store, Provider);
    Navigation.registerComponent('demo.SearchScreen', () => DemoSearchScreen, store, Provider);
    Navigation.registerComponent('demo.TabMenuScreen', () => DemoTabMenuScreen, store, Provider);
    Navigation.registerComponent('demo.SignatureScreen', () => DemoSignatureScreen, store, Provider);
    Navigation.registerComponent('demo.TimelineScreen', () => DemoTimelineScreen, store, Provider);
    Navigation.registerComponent('demo.components.tabs.TabOne', () => DemoTabOne, store, Provider);
    Navigation.registerComponent('demo.components.tabs.TabTwo', () => DemoTabTwo, store, Provider);
    Navigation.registerComponent('demo.C4CModuleListScreen', () => DemoC4CModuleListScreen, store, Provider);
    Navigation.registerComponent('demo.C4C.ContactScreen', () => DemoC4CContactScreen, store, Provider);
    Navigation.registerComponent('demo.C4C.LeadScreen', () => DemoC4CLeadScreen, store, Provider);

    Navigation.registerComponent('start.StartScreen', () => StartScreen, store, Provider);
    Navigation.registerComponent('application.HomeScreen', () => HomeScreen, store, Provider);
    Navigation.registerComponent('application.CustomerListScreen', () => CustomerListScreen, store, Provider);

    Navigation.registerComponent('application.CluesScreen', () => CluesScreen, store, Provider);
    Navigation.registerComponent('application.CreateClueScreen', () => CreateClueScreen, store, Provider);
    Navigation.registerComponent('application.ClueDetailScreen', () => ClueDetailScreen, store, Provider);

    Navigation.registerComponent('application.SelectModal', () => SelectModal, store, Provider);

    Navigation.registerComponent('application.UserProfileScreen', () => UserProfileScreen, store, Provider);
}
