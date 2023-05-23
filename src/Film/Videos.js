import React from 'react'
import axios from 'axios'
import './Videos.scss'
export default class Videos extends React.Component {
    state = {
        id: this.props.id,
        mode: this.props.mode,

        current_video_index: 0
    }
    split_video = (video) => {
        let Clip = []
        let Trailer = []
        if (video && video.length > 0) {
            video.forEach(element => {
                if (element.type === "Clip") {
                    Clip.push(element.key)
                }
                else if (element.type === "Trailer") {
                    Trailer.push(element.key)
                }
            });
        }
        return ({ clip: Clip, trailer: Trailer, length_clip: Clip.length, length_trailer: Trailer.length })
    }
    async componentDidMount() {
        let videos = await axios.get('https://api.themoviedb.org/3/' + this.state.mode + '/' + this.state.id + '/videos?api_key=b28a95fd7c9e0ad571b7ff6e54683cb7&language=en-US')
        this.setState({
            clip_trailer: 1,
            video: this.split_video(videos.data.results)
        })
    }
    handleNextVideo = () => {
        let temp = this.state.current_video_index + 1
        this.setState({
            current_video_index: temp,
        })
    }
    handlePrevVideo = () => {
        let temp = this.state.current_video_index - 1
        this.setState({
            current_video_index: temp,
        })
    }
    handleSwicth = () => {
        this.setState({
            current_video_index: 0,
            clip_trailer: (this.state.clip_trailer === 1 ? 0 : 1),
        })
    }
    render() {
        let length_list = this.state.video !== undefined ? (this.state.clip_trailer === 1 ? this.state.video.length_trailer : this.state.video.length_clip) : 0
        return (
            <>
                {
                    <div className="film-videos">
                        <h2 className="film-videos-title">Videos</h2>
                        <div className="videos-mode">{this.state.clip_trailer === 1 ? "(Trailers)" : "(Clips)"}</div>
                        <div className='film-videos-wrap'>
                            {this.state.video && this.state.video.clip ?
                                <iframe src={"https://www.youtube.com/embed/" + (this.state.clip_trailer === 1 ? this.state.video.trailer[this.state.current_video_index] : this.state.video.clip[this.state.current_video_index])} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> : <></>}
                            <div className="film-videos-button">
                                {this.state.clip_trailer === 1 ? <button className='switch' onClick={() => this.handleSwicth()}>Clip</button> : <button className='switch' onClick={() => this.handleSwicth()}>Trailer</button>}
                                <div className='page-wrap'>
                                    {this.state.current_video_index > 0 ? <button onClick={() => this.handlePrevVideo()}>Prev</button> : <></>}
                                    <div className='page'>{this.state.current_video_index + 1}</div>
                                    {this.state.current_video_index < (length_list - 1) ? <button onClick={() => this.handleNextVideo()}>Next</button> : <></>}
                                </div>
                            </div></div>

                    </div >
                }
            </>



        )
    }
}