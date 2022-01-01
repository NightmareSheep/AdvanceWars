using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.IO.Compression;
using System.Runtime.Serialization;

namespace WolfDen.Services
{
    public class CompressedSerializationService : ISerializationService
    {
        public byte[] Serialize(object obj)
        {
            var stream = SerializeToStream(obj);
            var compressed = Compress(stream);
            return compressed;
        }

        public object Deserialize(byte[] byteArray)
        {
            var stream = Decompress(byteArray);
            var obj = DeserializeFromStream(stream);
            return obj;
        }

        private static byte[] Compress(Stream input)
        {
            using (var compressStream = new MemoryStream())
            using (var compressor = new DeflateStream(compressStream, CompressionMode.Compress, true))
            {
                input.Position = 0;
                compressStream.Position = 0;
                input.CopyTo(compressor);
                compressor.Close();
                return compressStream.ToArray();
            }
        }

        private Stream Decompress(byte[] input)
        {
            var output = new MemoryStream();

            using (var compressStream = new MemoryStream(input))
            using (var decompressor = new DeflateStream(compressStream, CompressionMode.Decompress))
                decompressor.CopyTo(output);

            output.Position = 0;
            return output;
        }

        private MemoryStream SerializeToStream(object o)
        {
            MemoryStream stream = new MemoryStream();
            IFormatter formatter = new BinaryFormatter();
            formatter.Serialize(stream, o);
            return stream;
        }

        private object DeserializeFromStream(Stream stream)
        {
            IFormatter formatter = new BinaryFormatter();
            stream.Seek(0, SeekOrigin.Begin);
            object o = formatter.Deserialize(stream);
            return o;
        }
    }
}
