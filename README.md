from pydub import AudioSegment

from utils.silence import detect_silence_segments
from utils.cutter import (
    invert_silence_to_speech,
    merge_close_segments,
    cut_video_by_segments,
    burn_subtitles
)
from utils.transcriber import transcribe_audio
from utils.subtitles import (
    words_to_subtitle_blocks,
    shift_subtitles_to_cut_timeline,
    export_srt
)


def run_autocut(
    input_video: str,
    cut_style: str = "gentle",
    subtitle_style: str = "clean"
):
    AUDIO_PATH = "media/audio/audio.wav"
    OUTPUT_VIDEO = "media/output/autocut_video.mp4"
    FINAL_VIDEO = "media/output/autocut_subtitled.mp4"
    SUBTITLE_PATH = "media/output/subtitles.srt"

    # ---- LOAD AUDIO ----
    audio = AudioSegment.from_wav(AUDIO_PATH)
    total_duration = audio.duration_seconds

    # ---- CUT PRESETS ----
    if cut_style == "gentle":
        min_silence_len = 900
        buffer = 0.25
        merge_gap = 0.4
    else:  # aggressive
        min_silence_len = 400
        buffer = 0.1
        merge_gap = 0.2

    # ---- DETECT SILENCE ----
    silence_segments = detect_silence_segments(
        AUDIO_PATH,
        min_silence_len=min_silence_len,
        silence_thresh_offset=-16
    )

    # ---- SPEECH SEGMENTS ----
    speech_segments = invert_silence_to_speech(
        silence_segments,
        total_duration,
        buffer=buffer
    )

    speech_segments = merge_close_segments(
        speech_segments,
        merge_gap=merge_gap
    )

    # ---- CUT VIDEO ----
    cut_video_by_segments(
        input_video,
        speech_segments,
        OUTPUT_VIDEO
    )

    # ---- SUBTITLES ----
    words = transcribe_audio(AUDIO_PATH)

    raw_subtitles = words_to_subtitle_blocks(
        words,
        max_words=4
    )

    cut_subtitles = shift_subtitles_to_cut_timeline(
        raw_subtitles,
        speech_segments
    )

    export_srt(cut_subtitles, SUBTITLE_PATH)

    # ---- BURN SUBTITLES ----
    burn_subtitles(
        OUTPUT_VIDEO,
        SUBTITLE_PATH,
        FINAL_VIDEO
    )

    print(f"✅ AutoCut complete ({cut_style}, {subtitle_style})")
    print(f"🎬 Output: {FINAL_VIDEO}")
