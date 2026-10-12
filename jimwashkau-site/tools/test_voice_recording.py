import ast
import datetime
from pathlib import Path
import tempfile
import types
import unittest
from unittest.mock import patch
import wave

import numpy as np


class RecordingTests(unittest.TestCase):
    def test_stop_preserves_audio(self):
        source = Path(__file__).with_name('voice_to_log.py').read_text()
        tree = ast.parse(source)
        functions = ast.Module(body=[node for node in tree.body if isinstance(node, ast.FunctionDef)
                                    and node.name in ('record_audio_manual', 'wait_for_enter_to_stop')], type_ignores=[])
        for stop in ('enter', 'interrupt', 'stream_interrupt'):
            with self.subTest(stop=stop), tempfile.TemporaryDirectory() as directory:
                filename = str(Path(directory) / 'recording.wav')

                class Stream:
                    def __init__(self, **kwargs):
                        self.callback = kwargs['callback']

                    def __enter__(self):
                        self.callback(np.ones((128, 1), dtype=np.float32) * 0.25, 128, None, None)
                        return self

                    def __exit__(self, *args):
                        if stop == 'stream_interrupt':
                            raise KeyboardInterrupt

                namespace = {'np': np, 'wave': wave, 'datetime': datetime,
                             'SAMPLE_RATE': 44100, 'AUDIO_TMP_WAV': filename,
                             'sd': types.SimpleNamespace(InputStream=Stream)}
                exec(compile(functions, 'voice_to_log.py', 'exec'), namespace)
                with patch('builtins.input', side_effect=KeyboardInterrupt if stop == 'interrupt' else None,
                           return_value=''):
                    self.assertTrue(namespace['record_audio_manual']())
                with wave.open(filename, 'rb') as recording:
                    self.assertEqual(recording.getnframes(), 128)
                    self.assertEqual(recording.getsampwidth(), 2)


if __name__ == '__main__':
    unittest.main()
