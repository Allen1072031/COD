#include <vector>
#include <iostream>
#include <torch/torch.h>
#include <torch/script.h>
#include <csvloader.h>
#include <utils.h>
#include <fstream>
#include <time.h>
#include <time.h>

int main(int argc, char** argv) {
	// Load CSV data
	time_t begin, end;
    	time(&begin);
	std::ifstream file;
	//std::string path = argc > 1 ? argv[1] : "../extras/BostonHousing.csv";
	//std::string path = argc > 1 ? argv[1] : "../extras/output.csv";
	//std::string path = argc > 1 ? argv[1] : "../extras/stationdata.csv";
	std::string path = argc > 1 ? argv[1] : "../extras/notimetraindata.csv";
	//std::string path = argc > 1 ? argv[1] : "../extras/mkstationdata.csv";
	//std::string path = argc > 1 ? argv[1] : "../extras/easyoutput.csv";
	file.open(path, std::ios_base::in);
	
	// Exit if file not opened successfully
	if (!file.is_open()) {
		std::cout << "File not read successfully" << std::endl;
		std::cout << "Path given: " << path << std::endl;
		return -1;
	}
	// Process Data, load features and labels for LR
	std::pair<std::vector<float>, std::vector<float>> out = process_data(file);
	
	std::vector<float> inputs = out.first;
	std::vector<float> outputs = out.second;
	//std::vector<int> outputs = out.second;
	// Phase 1 : Data created
	//for (size_t i = 0; i < 10; i++) {
        //std::cout << "Inputs: " << i << ", : " << inputs[i] << std::endl;
    	//}
	//for (size_t i = 0; i < outputs.size(); i++) {
        //std::cout << "Outputs: " << i << ", : " << outputs[i] << std::endl;
    	//}
    	std::cout<<"Input size: "<<inputs.size()<<std::endl;
    	std::cout<<"Output size: "<<outputs.size()<<std::endl;
	// Convert vectors to a tensor
	// Reference: https://discuss.pytorch.org/t/passing-stl-container-to-torch-tensors/36614/2
	
	int seq_len=10;
	//int seq_len=30;
	int batch_size=3780;
	//int batch_size=1260;
	int input_size=4;
	//int input_size=5;
	// These fields should not be hardcoded (506, 1, 13)
	//auto output_tensors = torch::from_blob(outputs.data(), {int(outputs.size()), 1});
	//auto output_tensors = torch::from_blob(outputs.data(), {int(outputs.size())});
	auto input_tensors = torch::from_blob(inputs.data(), {int(outputs.size()), int(inputs.size()/outputs.size())});
	
	
	
	std::cout <<  input_tensors.sizes() << std::endl;
	torch::Tensor lstm_input = input_tensors.view({seq_len, batch_size, input_size});
	//for (size_t i = 0; i < 10; i++) {
        //  std::cout << "Inputs_tensors " << i << " : " << input_tensors[i] << std::endl;
    	//}
    	//std::cout <<  lstm_input << std::endl;
	//std::cout <<  lstm_input.sizes() << std::endl;
	//std::cout << "Output_tensors" << output_tensors << std::endl;
	file.close();
	
	
	std::string path1 = argc > 1 ? argv[1] : "../extras/time10/trainoutput.csv";
	//std::string path1 = argc > 1 ? argv[1] : "../extras/time30/trainoutput.csv";
	file.open(path1, std::ios_base::in);
	std::pair<std::vector<float>, std::vector<float>> lout = process_data(file);
	
	std::vector<float> linputs = lout.first;
	std::vector<float> loutputs = lout.second;
	auto output_tensors = torch::from_blob(loutputs.data(), {int(loutputs.size())});
	
	
	std::cout<<"Output_tensors size: "<<output_tensors.sizes()<<std::endl;
	
	// Phase 2 : Create Network
	//auto net = std::make_shared<Net>(int(input_tensors.sizes()[1]), 1);
	//auto net = std::make_shared<Net>(int(input_tensors.sizes()[1]), 8);
	
	auto net = std::make_shared<Net>(input_size, 8);
	
	//auto net = std::make_shared<Net>(4, 8);
	//torch::optim::SGD optimizer(net->parameters(), 0.001);
	torch::optim::Adam optimizer(net->parameters(),0.001);
	
	
	// Phase 3 : Train and Print Loss
	
	
	std::size_t n_epochs = 50000;
	int times=0;
	float best_loss = 0;
	for (std::size_t epoch = 1; epoch <= n_epochs; epoch++) {
		optimizer.zero_grad();
		auto out = net->forward(lstm_input);
		output_tensors = output_tensors.to(torch::kLong);
		//std::cout << "out shape: " << out.sizes() << std::endl;
		auto loss = torch::nll_loss(out, output_tensors);
		//auto loss = torch::mse_loss(out, output_tensors);
		float loss_val = loss.item<float>();
		
		
		loss.backward();
		
		optimizer.step();
		//scheduler.step(1);
		std::cout << "Loss: " << loss_val << std::endl;
		
		
		if (epoch==1){
			best_loss = loss_val;
		}
		
		if (loss_val < best_loss) {
            		best_loss = loss_val;
            		times = 0;
        	} else {
            		times++;
        	}
		//std::cout << "times: " << times << std::endl;
		
		
		
	}
	
	
	
	auto trainout = net->forward(lstm_input);
	
	float fn=0,fp=0,tp=0,tn=0;
	for(int i=0;i<batch_size;++i){
		//std::cout << "Out: " << out[i] << std::endl;
		float predicted=trainout[i].argmax(0).item<float>();
		float answer=output_tensors[i].item<float>();
		//std::cout << "predict: " << predicted << std::endl;
		//std::cout << "ans: " << answer << std::endl;
		
		
		
		if((predicted==answer)&&(answer!=0)){
			tp++;
		}
		else if((predicted==answer)&&(answer==0)){
			tn++;
		}
		else if((predicted!=answer)&&(answer==0)){
			fp++;
		}
		else if((predicted!=answer)&&(answer!=0)){
			fn++;
		}
		
		
		
		
	}
	std::cout << "tp,tn,fp,fn: " << tp<<" "<<tn <<" " <<fp << " " <<fn<<std::endl;
	std::cout << "train_acc: " << (tp+tn)/(tp+tn+fp+fn)*100 << "%" << std::endl;
	std::cout << "train_precision: " << tp/(tp+fp) << std::endl;
	std::cout << "train_recall: " << tp/(tp+fn) << std::endl;
	
	file.close();
	
	std::string model_path = "model.pt";
	
    	torch::save(net,model_path);

    	// 載入模型
    	torch::jit::script::Module loaded_module;
	    try {
		loaded_module = torch::load(model_path);
			std::cout << "Success" << std::endl;
	    } catch (const c10::Error& e) {
		std::cerr << "載入模型失敗: " << e.msg() << std::endl;
		return -1;
	   }
	
	//validation
	
	std::string path2 = argc > 1 ? argv[1] : "../extras/notimevaliddata.csv";
	file.open(path2, std::ios_base::in);
	std::pair<std::vector<float>, std::vector<float>> out1 = process_data(file);
	std::vector<float> inputs1 = out1.first;
	std::vector<float> outputs1 = out1.second;
	auto input_tensors1 = torch::from_blob(inputs1.data(), {int(outputs1.size()), int(inputs1.size()/outputs1.size())});
	int vseq_len=10;
	//int vseq_len=30;
	int vbatch_size=1890;
	//int vbatch_size=630;
	int vinput_size=4;
	
	
	torch::Tensor valid_lstm_input = input_tensors1.view({vseq_len, vbatch_size, vinput_size});
	
	//std::vector<torch::jit::IValue> inputs{valid_lstm_input};
	//auto validout = loaded_module.forward(inputs).toTensor();
	//for(int i=0;i<vbatch_size;++i){
	//	std::cout << "Validout: " << validout[i] << std::endl;
	//}
	
	
	auto validout = net->forward(valid_lstm_input);
	float acc=0;
	file.close();
	std::string path3 = argc > 1 ? argv[1] : "../extras/time10/validoutput.csv";
	//std::string path3 = argc > 1 ? argv[1] : "../extras/time30/validoutput.csv";
	file.open(path3, std::ios_base::in);
	std::pair<std::vector<float>, std::vector<float>> vout = process_data(file);
	
	std::vector<float> vinputs = vout.first;
	std::vector<float> voutputs = vout.second;
	auto voutput_tensors = torch::from_blob(voutputs.data(), {int(voutputs.size())});
	std::cout<<"Output_tensors size: "<<voutput_tensors.sizes()<<std::endl;
	float vfn=0,vfp=0,vtp=0,vtn=0;
	for(int i=0;i<vbatch_size;++i){
			//std::cout << "Out: " << validout[i] << std::endl;
			float predicted=validout[i].argmax(0).item<float>();
			float answer=voutput_tensors[i].item<float>();
			//std::cout << "predict: " << predicted << std::endl;
			//std::cout << "ans: " << answer << std::endl;
			if((predicted==answer)&&(answer!=0)){
				vtp++;
			}else if((predicted!=answer)&&(answer==0)){
				vfp++;
			}
			else if((predicted==answer)&&(answer==0)){
				vtn++;
			}
			else if((predicted!=answer)&&(answer!=0)){
				vfn++;
			}
	}
	std::cout << "valid tp,tn,fp,fn: " << vtp<<" "<<vtn <<" " <<vfp << " " <<vfn<<std::endl;
	std::cout << "valid_acc: " << (vtp+vtn)/(vtp+vtn+vfp+vfn)*100 << "%" << std::endl;
	std::cout << "valid_precision: " << vtp/(vtp+vfp) << std::endl;
	std::cout << "valid_recall: " << vtp/(vtp+vfn) << std::endl;
	
	file.close();
	
	//testing
	
	std::string path4 = argc > 1 ? argv[1] : "../extras/notimetestdata.csv";
	file.open(path4, std::ios_base::in);
	std::vector<float> inputs2 = test_process_data(file);
	int outputs2_size = int(inputs2.size()/4);
	auto input_tensors2 = torch::from_blob(inputs2.data(), {outputs2_size, int(inputs2.size()/outputs2_size)});
	int tseq_len=10;
	//int tseq_len=30;
	int tbatch_size=630;
	//int tbatch_size=210;
	int tinput_size=4;
	torch::Tensor test_lstm_input = input_tensors2.view({tseq_len, tbatch_size, tinput_size});
	auto testout = net->forward(test_lstm_input);
	file.close();
	std::string path5 = argc > 1 ? argv[1] : "../extras/time10/testoutput.csv";
	//std::string path5 = argc > 1 ? argv[1] : "../extras/time30/testoutput.csv";
	file.open(path5, std::ios_base::in);
	std::pair<std::vector<float>, std::vector<float>> tout = process_data(file);
	
	std::vector<float> tinputs = tout.first;
	std::vector<float> toutputs = tout.second;
	auto toutput_tensors = torch::from_blob(toutputs.data(), {int(toutputs.size())});
	std::cout<<"Output_tensors size: "<<toutput_tensors.sizes()<<std::endl;
	float tfn=0,tfp=0,ttp=0,ttn=0;
	for(int i=0;i<tbatch_size;++i){
			//std::cout << "Out: " << validout[i] << std::endl;
			float predicted=testout[i].argmax(0).item<float>();
			float answer=toutput_tensors[i].item<float>();
			//std::cout << "predict: " << predicted << std::endl;
			//std::cout << "ans: " << answer << std::endl;
			if((predicted==answer)&&(answer!=0)){
				ttp++;
			}else if((predicted!=answer)&&(answer==0)){
				tfp++;
			}
			else if((predicted==answer)&&(answer==0)){
				ttn++;
			}
			else if((predicted!=answer)&&(answer!=0)){
				tfn++;
			}
	}
	std::cout << "test tp,tn,fp,fn: " << ttp<<" "<<ttn <<" " <<tfp << " " <<tfn<<std::endl;
	std::cout << "test_acc: " << (ttp+ttn)/(ttp+ttn+tfp+tfn)*100 << "%" << std::endl;
	std::cout << "test_precision: " << ttp/(ttp+tfp) << std::endl;
	std::cout << "test_recall: " << ttp/(ttp+tfn) << std::endl;
	
	file.close();
	
	
	time(&end);
    	time_t elapsed = end - begin;
    	std::cout << "Time: " << elapsed << std::endl;
    	
    	
    	
    	
    	
	/*for (std::size_t epoch = 1; epoch <= n_epochs; epoch++) {
		optimizer.zero_grad();
		//auto out = net->forward(input_tensors);
		output_tensors = output_tensors.to(torch::kLong);
		//auto loss = torch::mse_loss(out, output_tensors);
		auto loss = torch::nll_loss(out, output_tensors);
		
		float loss_val = loss.item<float>();
		
		loss.backward();
		optimizer.step();
		std::cout << "Loss: " << loss_val << std::endl;
		srand(time(NULL));
		int min = 0;
		int max = 8000;
		//int max = 20;
		int x = rand() % (max-min+1) +min;
		int k=5;
		float score=0;*/
		//float predicted=out[1].argmax(0).item<float>();
		//std::cout << "predict: " << predicted << std::endl;
		/*
		if(epoch == n_epochs){
		    while(k>0){
		    	for(int i=0;i<outputs.size();++i){
		    	//for(int i=0;i<20;++i){
			  	int j = rand() % (max-min+1) +min;
				if(i==j){
				  //std::cout<<"j = "<< j <<std::endl;
				  float predicted=out[i].argmax(0).item<float>();
				  float answer=output_tensors[i].item<float>();
			    	  std::cout << "predict: " << predicted << std::endl;
			    	  std::cout << "ans: " << answer << std::endl;
			    	  k--;
				}
		        
		   	}
		    	
		  	}
		  	for(int i=0;i<outputs.size();++i){
		  		if(out[i].argmax(0).item<float>()==outputs[i]){
		  			score++;
		  		}
		  	}
		  	std::cout << "train_acc: " << score/outputs.size()*100 << "%" << std::endl;
		}*/
		//std::cout << "Out: " << out << std::endl;
		//std::cout << "input" << std::endl;
		//std::cout << input_tensors << std::endl;
		//std::cout << "Out: " << output_tensors << std::endl;
	//}
	//file.close();
	/*std::string path1 = argc > 1 ? argv[1] : "../extras/valid.csv";
	file.open(path1, std::ios_base::in);
	std::pair<std::vector<float>, std::vector<float>> out1 = process_data(file);
	std::vector<float> inputs1 = out1.first;
	std::vector<float> outputs1 = out1.second;
	//std::cout << "size: " << outputs1.size() << std::endl;
	auto output_tensors1 = torch::from_blob(outputs1.data(), {int(outputs1.size())});
	auto input_tensors1 = torch::from_blob(inputs1.data(), {int(outputs1.size()), int(inputs1.size()/outputs1.size())});
	auto testout = net->forward(input_tensors1);
	float acc=0;/*
	/*for(int i=0;i<80;++i){
				  float predicted=testout[i].argmax(0).item<float>();
				  float answer=output_tensors1[i].item<float>();
			    	  std::cout << "predict: " << predicted << std::endl;
			    	  std::cout << "validans: " << answer << std::endl; 
	}*/
	/*for(int i=0;i<outputs1.size();++i){
		  		if(testout[i].argmax(0).item<float>()==outputs1[i]){
		  			acc++;
		  		}
		  	}
		  	std::cout << "valid accuracy: " << acc/outputs1.size()*100 << "%" << std::endl;
	*/	        
		   	
}
