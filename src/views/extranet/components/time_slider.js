import React, { useState } from 'react'
import { Slider, Rail, Ticks, Handles, Tracks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from "./slider_components"

function TimeSlider(props) {
  const domain = [0, 23]
  const defaultValues = [8, 17]
  const [selectedTime, setSelectedTime] = useState(null)

  return (
    <Slider
      mode={2}
      step={1}
      domain={domain}
      values={defaultValues}
      onChange={
        (val) => {
          setSelectedTime(val)
          console.log(val)
        }
      }
    >
      <Rail>
        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={domain}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
      <Ticks values={[0, 4, 8, 12, 16, 20, 24]}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick key={tick.id} tick={tick} count={ticks.length} />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  )
}

export default TimeSlider