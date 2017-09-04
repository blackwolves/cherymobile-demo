#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNNotifications.h"

// **********************************************
// *** DON'T MISS: THE NEXT LINE IS IMPORTANT ***
// **********************************************
#import "RCCManager.h"
#import "RNCookieManagerIOS.h"

// IMPORTANT: if you're getting an Xcode error that RCCManager.h isn't found, you've probably ran "npm install"
// with npm ver 2. You'll need to "npm install" with npm 3 (see https://github.com/wix/react-native-navigation/issues/1)

#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // 接入个推
  //[GeTuiSdk startSdkWithAppId:kGtAppId appKey:kGtAppKey appSecret:kGtAppSecret delegate:self];
  // APNs
  //[self registerRemoteNotification];
  NSURL *jsCodeLocation;
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  
  if ([launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey]!=nil) {
    int badge = [UIApplication sharedApplication].applicationIconBadgeNumber;
    if (badge>0) {
      badge--;
      [UIApplication sharedApplication].applicationIconBadgeNumber = badge;
    }
  }
  [[UIApplication sharedApplication] registerForRemoteNotificationTypes:UIRemoteNotificationTypeSound|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeBadge];
  
#ifdef DEBUG
  //  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  
  // **********************************************
  // *** DON'T MISS: THIS IS HOW WE BOOTSTRAP *****
  // **********************************************
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  
  /*
   // original RN bootstrap - remove this part
   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
   moduleName:@"example"
   initialProperties:nil
   launchOptions:launchOptions];
   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
   */
  
  
  return YES;
}


// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNNotifications didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSString *token = [NSString stringWithFormat:@"%@", deviceToken];
  NSLog(@"My token is:%@", token);
  [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}

// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification {
  [RNNotifications didReceiveRemoteNotification:notification];
}

// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RNNotifications didReceiveLocalNotification:notification];
}
/*
 
 - (void)registerRemoteNotification {
	if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
 #if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0 // Xcode 8编译会调用
 UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
 center.delegate = self;[center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionCarPlay) completionHandler:^(BOOL granted, NSError *_Nullable error) {
 if (!error) {
 NSLog(@"request authorization succeeded!");
 }
 }];
 [[UIApplication sharedApplication] registerForRemoteNotifications];
 #else // Xcode 7编译会调用
 UIUserNotificationType types = (UIUserNotificationTypeAlert | UIUserNotificationTypeSound | UIUserNotificationTypeBadge);
 UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
 [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
 [[UIApplication sharedApplication] registerForRemoteNotifications];
 #endif
 } else if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
 UIUserNotificationType types = (UIUserNotificationTypeAlert | UIUserNotificationTypeSound | UIUserNotificationTypeBadge);
 UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
 [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
 [[UIApplication sharedApplication] registerForRemoteNotifications];
 } else {
 UIRemoteNotificationType apn_type = (UIRemoteNotificationType)(UIRemoteNotificationTypeAlert |
 UIRemoteNotificationTypeSound |
 UIRemoteNotificationTypeBadge);
 [[UIApplication sharedApplication] registerForRemoteNotificationTypes:apn_type];
 }
 }
 /** 远程通知注册成功委托 */
/*
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	NSString *token = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
 token = [token stringByReplacingOccurrencesOfString:@" " withString:@""];
 NSLog(@">>>[DeviceToken Success]:%@", token);
 // [ GTSdk ]：向个推服务器注册deviceToken
 [GeTuiSdk registerDeviceToken:token];
 }
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
 // [ GTSdk ]：将收到的APNs信息传给个推统计
 [GeTuiSdk handleRemoteNotification:userInfo];
 // 控制台打印接收APNs信息
 NSLog(@">>>[Receive RemoteNotification]:%@", userInfo);
 [[NSNotificationCenter defaultCenter]postNotificationName:GT_DID_RECEIVE_REMOTE_NOTIFICATION object:@{@"type":@"apns",@"userInfo":userInfo}];
 completionHandler(UIBackgroundFetchResultNewData);
 }
 #if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
 - (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
 [[NSNotificationCenter defaultCenter]postNotificationName:GT_DID_RECEIVE_REMOTE_NOTIFICATION object:@{@"type":@"apns",@"userInfo":notification.request.content.userInfo}]; completionHandler(UNNotificationPresentationOptionAlert);
 }
 - (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
 [GeTuiSdk handleRemoteNotification:response.notification.request.content.userInfo];
 [[NSNotificationCenter defaultCenter]postNotificationName:GT_DID_CLICK_NOTIFICATION object:response.notification.request.content.userInfo];
 completionHandler();
 }
 #endif
 /** SDK成功注册 CID 回调 */
/*
 -(void)GeTuiSdkDidRegisterClient:(NSString *)clientId{
 [[NSNotificationCenter defaultCenter]postNotificationName:GT_DID_REGISTE_CLIENTID object:clientId];
 }
 
 /** SDK收到透传消息回调 */
/*
 - (void)GeTuiSdkDidReceivePayloadData:(NSData *)payloadData andTaskId:(NSString *)taskId andMsgId:(NSString *)msgId andOffLine:(BOOL)offLine fromGtAppId:(NSString *)appId {
 // [ GTSdk ]：汇报个推自定义事件(反馈透传消息)
 [GeTuiSdk sendFeedbackMessage:90001 andTaskId:taskId andMsgId:msgId];
 
 // 数据转换
 NSString *payloadMsg = nil;
 if (payloadData) {
 payloadMsg = [[NSString alloc] initWithBytes:payloadData.bytes length:payloadData.length encoding:NSUTF8StringEncoding];
 }
 
 // 控制台打印日志
 NSString *msg = [NSString stringWithFormat:@"taskId=%@,messageId:%@,payloadMsg:%@%@", taskId, msgId, payloadMsg, offLine ? @"<离线消息>" : @""];
 NSDictionary *userInfo = @{@"taskId":taskId,@"msgId":msgId,@"payloadMsg":payloadMsg,@"offLine":offLine?@"YES":@"NO"};
 [[NSNotificationCenter defaultCenter]postNotificationName:GT_DID_RECEIVE_REMOTE_NOTIFICATION object:@{@"type":@"payload",@"userInfo":userInfo}];
 NSLog(@">>[GTSdk ReceivePayload]:%@", msg);
 }
 */
@end
