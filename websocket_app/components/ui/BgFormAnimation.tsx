import { View } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withRepeat, 
    Easing
} from "react-native-reanimated";

export default function BgFormAnimation() {
    const rotationOne = useSharedValue(0);
    const rotationTwo = useSharedValue(0);
    const rotationThree = useSharedValue(0);

    useEffect(() => {
        rotationOne.value = withRepeat(
            withTiming(360, { duration: 3000, easing: Easing.linear }),
            -1
        );
        rotationTwo.value = withRepeat(
            withTiming(360, { duration: 4000, easing: Easing.linear }),
            -1
        );
        rotationThree.value = withRepeat(
            withTiming(360, { duration: 5000, easing: Easing.linear }),
            -1
        );
    }, [rotationOne, rotationThree, rotationTwo]);


    const transformOne = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationOne.value}deg` }],
    }));

    const transformTwo = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationTwo.value}deg` }],
    }));

    const transformThree = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationThree.value}deg` }],
    }));

    return (
        <View className="absolute right-1 h-full w-full items-center">
            <Animated.View 
                style={transformOne} 
                className="top-[65%] rounded-[30%] overflow-hidden w-[800px] h-[800px]"
            >
                <LinearGradient
                    colors={["rgba(206, 0, 224, 0.2)", "rgba(168, 0, 183, 0.2)"]}
                    locations={[.1, 1]}
                    className="flex-1"
                />
            </Animated.View>

            <Animated.View 
                style={transformTwo} 
                className="bottom-[10%] rounded-[30%] overflow-hidden w-[800px] h-[800px]"
            >
                <LinearGradient
                    colors={["rgba(206, 0, 224, 0.2)", "rgba(168, 0, 183, 0.2)"]}
                    locations={[.1, 1]}
                    className="flex-1"
                />
            </Animated.View>

            <Animated.View 
                style={transformThree} 
                className="bottom-[105%] rounded-[30%] overflow-hidden w-[800px] h-[800px]"
            >
                <LinearGradient
                    colors={["rgba(206, 0, 224, 0.2)", "rgba(168, 0, 183, 0.2)"]}
                    locations={[.1, 1]}
                    className="flex-1"
                />
            </Animated.View>
        </View>
    );
}