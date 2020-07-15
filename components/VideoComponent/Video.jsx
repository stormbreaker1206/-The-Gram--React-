import React from 'react'
import {View, Image} from "react-native";
import {Video} from "expo-av";
class VideoPlayer extends React.Component{

    state={
        imageLoaded:false,
        thumbnails: null,
        showVid: false
    }

    restAsync = async ()=>{
        await this._video.stopAsync();
        await this._video.setPositionAsync(1100)
        
    }
 

  componentDidMount(){
   // this._video.setStatusAsync(1500)
 //  this._video.setPositionAsync(1100)
  }

    render(){
     
        return(
            <View>

<Video
                            
                                        
                            ref={(c) => {
                              this._video = c;
                          }}
                            source={this.props.item ? {uri: this.props.item } : null}
                         
                            onPlaybackStatusUpdate={(status)=>{
                                if(status.didJustFinish){
                                  this.restAsync()
                                }
                            }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            shouldPlay={false}
                            isLooping={false}
                            useNativeControls
                            resizeMode="cover"
                            style={{ height: 300,
                           marginVertical: 16, alignItems:'center' }}
                        />
                 
           </View>

        )
    }
}

export default VideoPlayer