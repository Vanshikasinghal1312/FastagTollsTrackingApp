# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html


# React Native / Navigation / Firebase Proguard rules
-keep class com.swmansion.** { *; }
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**
-keep class androidx.navigation.** { *; }

-keep class com.google.android.gms.maps.** { *; }
-keep interface com.google.android.gms.maps.** { *; }
-dontwarn com.google.android.gms.maps.**
-keep class com.google.maps.android.** { *; }
-keep class com.airbnb.** { *; }
