import React from 'react';
import {View, Image, StyleSheet} from 'react-native'
import LightBoxView from "../LightBox/LightBoxComponent";
import Lightbox from "react-native-lightbox";
import LoadingView from "../LoadingIndicator/LoadingView";
import {connect} from 'react-redux';
class ImageView extends React.Component{

    state={
        imageLoaded: null
    }
    render(){
       
        return(
            <Lightbox springConfig={{tension: 15, friction: 7}} swipeToDismiss={false} 
             renderContent={()=><LightBoxView item={this.props.postItem} user={this.props.currentUser.uid} userLikedPost={this.props.userLikedPost} postId={this.props.itemKey} />}>

            <View>
            <Image  source={{uri: this.props.item}} style={styles.postImage} resizeMode="cover"
                    onLoadStart={()=>this.setState({imageLoaded:true})}
                    onLoadEnd={()=>this.setState({imageLoaded:false})}



            />

            {this.state.imageLoaded && <LoadingView/>}
            </View>
        </Lightbox>
        )
    }
}

const mapStateToProps = ({auth: {currentUser}}) => ({
    currentUser,
   
})

const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        height: 300,
      //  borderRadius: 5,
        marginVertical: 16
    }
})

export default connect(mapStateToProps) (ImageView)