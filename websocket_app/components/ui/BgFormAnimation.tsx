import { Animated, Easing, View } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";


export default function BgFormAnimation() {
    const spinValueOne = useMemo(() => new Animated.Value(0), []);
    const spinValueTwo = useMemo(() => new Animated.Value(0), []);
    const spinValueThree = useMemo(() => new Animated.Value(0), []);

    const spinOne = useCallback(() => {
        spinValueOne.setValue(0);

        Animated.timing(spinValueOne, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spinOne());

    }, [spinValueOne]);

    const spinTwo = useCallback(() => {
        spinValueTwo.setValue(0);

        Animated.timing(spinValueTwo, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spinTwo());

    }, [spinValueTwo]);

    const spinThree = useCallback(() => {
        spinValueThree.setValue(0);

        Animated.timing(spinValueThree, {
            toValue: 1,
            duration: 7000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spinThree());

    }, [spinValueThree]);


    useEffect(() => {
        spinOne();
        spinTwo();
        spinThree();
    }, [spinOne, spinTwo, spinThree]);


    const rotateOne = spinValueOne.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });

    const rotateTwo = spinValueTwo.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });

    const rotateThree = spinValueThree.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    });


    return (
        <View className="absolute right-1 h-full w-full items-center">

            <Animated.View 
                style={{transform: [{rotate: rotateOne}]}} 
                className="top-[60%] rounded-[30%] overflow-hidden w-[600px] h-[600px]"
            >
                <LinearGradient
                    colors={["rgba(139, 0, 253, 0.5)", "rgba(168, 0, 183, 0.5)"]}
                    // colors={["#fff", "#aaa"]}
                    locations={[.5, 1]}
                    className="flex-1"
                />
            </Animated.View>


            <Animated.View 
                style={{transform: [{rotate: rotateTwo}]}} 
                className="bottom-[10%] rounded-[30%] overflow-hidden w-[600px] h-[600px]"
            >
                <LinearGradient
                    colors={["rgba(139, 0, 253, 0.5)", "rgba(168, 0, 183, 0.5)"]}
                    locations={[.5, 1]}
                    className="flex-1"
                />
            </Animated.View>

            <Animated.View 
                style={{transform: [{rotate: rotateThree}]}} 
                className="bottom-[70%] rounded-[30%] overflow-hidden w-[600px] h-[600px]"
            >
                <LinearGradient
                    colors={["rgba(139, 0, 253, 0.5)", "rgba(168, 0, 183, 0.5)"]}
                    locations={[.5, 1]}
                    className="flex-1"
                />
            </Animated.View>


            {/* <Animated.View 
                style={{transform: [{rotate}]}} 
                className="absolute left-36 bottom-7"
            >
                <LinearGradient
                    colors={["#8a00fd", "#A800B7"]}
                    locations={[.5, 1]}
                    className="w-52 h-52"
                />
            </Animated.View> */}

        </View>

    )
}