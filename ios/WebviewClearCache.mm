#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WebviewClearCache, NSObject)

RCT_EXTERN_METHOD(clearCache:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
