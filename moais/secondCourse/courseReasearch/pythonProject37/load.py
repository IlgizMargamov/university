import keras2onnx
import tensorflow as tf

def convert_tesnorflow_keras_model_to_onnx(path_to_model, path_to_converted_model=None) -> None:
    if path_to_converted_model is None:
        print("Path to converted model is not specified")
        print("Using standard path to place converted model")
        path_to_converted_model=path_to_model+".onnx"
        print("Path: " + path_to_converted_model)
    try:
        model = tf.keras.models.load_model(path_to_model)
        onnx_model = keras2onnx.convert_keras(model, model.name)

        with open(path_to_converted_model, "wb") as output:
            output.write(onnx_model.SerializeToString())
    except ImportError:
        print("Loading from an hdf5 file and h5py is not available.")
    except IOError:
        print('Unable to load model. Filepath is not an hdf5 file (or h5py is not available) or SavedModel.')
    except Exception:
        print(Exception.with_traceback())
    finally:
        print("Done")


convert_tesnorflow_keras_model_to_onnx("C:\\Users\\Gizon\\Desktop\\Study\\moais\\secondCourse\\courseReasearch\\pythonProject37\\cnn.h5")
"""2022-06-11 21:01:35.703976: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cudart64_101.dll'; dlerror: cudart64_101.dll not found
2022-06-11 21:01:35.704103: I tensorflow/stream_executor/cuda/cudart_stub.cc:29] Ignore above cudart dlerror if you do not have a GPU set up on your machine.
2022-06-11 21:01:37.297369: I tensorflow/stream_executor/platform/default/dso_loader.cc:44] Successfully opened dynamic library nvcuda.dll
2022-06-11 21:01:38.567365: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1561] Found device 0 with properties: 
pciBusID: 0000:02:00.0 name: NVIDIA GeForce GTX 1650 with Max-Q Design computeCapability: 7.5
coreClock: 1.245GHz coreCount: 16 deviceMemorySize: 4.00GiB deviceMemoryBandwidth: 104.34GiB/s
2022-06-11 21:01:38.568662: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cudart64_101.dll'; dlerror: cudart64_101.dll not found
2022-06-11 21:01:38.569767: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cublas64_10.dll'; dlerror: cublas64_10.dll not found
2022-06-11 21:01:38.571154: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cufft64_10.dll'; dlerror: cufft64_10.dll not found
2022-06-11 21:01:38.572221: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'curand64_10.dll'; dlerror: curand64_10.dll not found
2022-06-11 21:01:38.573310: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cusolver64_10.dll'; dlerror: cusolver64_10.dll not found
2022-06-11 21:01:38.574408: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cusparse64_10.dll'; dlerror: cusparse64_10.dll not found
2022-06-11 21:01:38.575461: W tensorflow/stream_executor/platform/default/dso_loader.cc:55] Could not load dynamic library 'cudnn64_7.dll'; dlerror: cudnn64_7.dll not found
2022-06-11 21:01:38.575568: W tensorflow/core/common_runtime/gpu/gpu_device.cc:1598] Cannot dlopen some GPU libraries. Please make sure the missing libraries mentioned above are installed properly if you would like to use GPU. Follow the guide at https://www.tensorflow.org/install/gpu for how to download and setup the required libraries for your platform.
Skipping registering GPU devices...
2022-06-11 21:01:38.576029: I tensorflow/core/platform/cpu_feature_guard.cc:143] Your CPU supports instructions that this TensorFlow binary was not compiled to use: AVX2
2022-06-11 21:01:38.584489: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x15abbbac120 initialized for platform Host (this does not guarantee that XLA will be used). Devices:
2022-06-11 21:01:38.584706: I tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version
2022-06-11 21:01:38.584939: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1102] Device interconnect StreamExecutor with strength 1 edge matrix:
2022-06-11 21:01:38.586160: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1108]      
tf executing eager_mode: True
tf.keras model eager_mode: False
The ONNX operator number change on the optimization: 28 -> 14

Process finished with exit code 0
"""