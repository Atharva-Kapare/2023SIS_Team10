import { FaPause, FaPlay } from 'react-icons/fa'
import React, { Component } from "react";
import "./styles.css";

// const PlayButton = () => {
//   return (
//     <button className='transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'>
//         <FaPlay className='text-black'/>
//     </button>
//   )
// }

// export default PlayButton

class PlayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  onPlay = (event) => {
    this.setState({ playing: true });
  };
  onPause = (event) => {
    this.setState({ playing: false });
  };
  onEnded = (event) => {
    this.setState({ playing: false });
  };

  playAudio = () => {
    this.audioEl.play();
    const audio = this.audioEl;
    audio.addEventListener("play", this.onPlay);
    audio.addEventListener("pause", this.onPause);
  };

  pauseAudio = () => {
    this.audioEl.pause();
  };

  startAudio = () => {
    this.playAudio();
  };

  renderAudio = () => {
    const { url } = this.props;
    const { playing } = this.state;
    const notSupportedMsg =
      "Your browser does not support the <code>audio</code> element.";
    return (
      <>
        {!playing && (
          <i class="fa fa-play" onClick={this.startAudio}></i>
        )}
        {playing && <i class="fa fa-pause" onClick={this.pauseAudio}></i>}

        <audio
          src={url}
          ref={(ref) => {
            this.audioEl = ref;
          }}
        >
          {notSupportedMsg}
        </audio>
      </>
    );
  };

  render() {
    return this.renderAudio();
  }
}

export default PlayButton;
