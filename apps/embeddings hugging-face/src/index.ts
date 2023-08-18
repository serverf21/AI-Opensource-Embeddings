
// or npm:
import { HfInference } from "@huggingface/inference";
import { config } from "dotenv";

config({path: '.env.local'});

const hf = new HfInference(process.env.HF_TOKEN);

// we might perform dot product or inner product to classify
// hence it is better to choose a model with optimum (not very high) dimensions

function dotProduct(a: number[], b: number[]){
    if(a.length != b.length){
        throw new Error("Both arguments should have the same length for dot product");
    }

    let result = 0;
    for(let i = 0; i < a.length; i++){
        result += (a[i] * b[i]);
    }
    return result;
}

// const output1 = await hf.featureExtraction({
//     model: "intfloat/e5-small-v2",
//     inputs: "That is a happy person",
//   });
// const output2 = await hf.featureExtraction({
//     model: "intfloat/e5-small-v2",
//     inputs: "That is a happy person",
//   });
// similarity: 0.999999 

const output1 = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "That is a happy person",
});
const output2 = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "That is a happy person",
});
// similarity: 1.000000076

// console.log(output1);

if (is1DArray(output1) && is1DArray(output2)) {
    const similarity = dotProduct(output1, output2);
  
    console.log(similarity);
}
  
function is1DArray<T>(value: (T | T[] | T[][])[]): value is T[] {
return !Array.isArray(value[0]);
}

// console.log(output2);




