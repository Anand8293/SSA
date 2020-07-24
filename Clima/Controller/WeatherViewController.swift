//
//  ViewController.swift
//  Clima
//
//  Created by Angela Yu on 01/09/2019.
//  Copyright © 2019 App Brewery. All rights reserved.
//

import UIKit
import CoreLocation

class WeatherViewController: BaseViewController, UITextFieldDelegate, WeatherManagerDelegate {
    
    
    @IBOutlet weak var conditionImageView: UIImageView!
    @IBOutlet weak var temperatureLabel: UILabel!
    @IBOutlet weak var cityLabel: UILabel!
    @IBOutlet weak var searchTextField: UITextField!
    @IBOutlet weak var weatherName: UILabel!
    @IBOutlet weak var weatherDate: UILabel!
    
    @IBOutlet weak var feelLike: UILabel!
    @IBOutlet weak var sunrice: UILabel!
    @IBOutlet weak var sunset: UILabel!
    @IBOutlet weak var windSpeed: UILabel!
    @IBOutlet weak var precipatation: UILabel!
    
    var weatherBrain = WeatherBrain()
 //   var locationManager = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
      //  locationManager.delegate = self
        
       // locationManager.requestWhenInUseAuthorization()
        
        searchTextField.delegate = self
        
        weatherBrain.delegate = self
        
        // Do any additional setup after loading the view.
    }
    
    
    func textFieldShouldEndEditing(_ textField: UITextField) -> Bool {
        if textField.text != "" {
            return true
        }
        else {
            searchTextField.placeholder = "Please enter city"
            print("Please enter city")
            return false
        }
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        searchTextField.endEditing(true)
        return true
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        weatherBrain.getWeather(city: textField.text!)
        searchTextField.text = ""
    }
    
    @IBAction func onClickGo(_ sender: UIButton) {
        searchTextField.endEditing(true)
    }
//    @IBAction func onPressFindLocation(_ sender: UIButton) {
//        locationManager.requestLocation()
//    }
    
    
    func didViewUpdated(response: WeatherData?) {
        let image = weatherBrain.getConditionString(conditionID: response?.weather[0].id ?? 200)
        print(image)
        
        DispatchQueue.main.async {
        
            self.searchTextField.text = response?.name
            self.cityLabel.text = response?.name
            self.temperatureLabel.text = String(format: "%.1f", response?.main?.temp ?? 0.0)
            self.conditionImageView.image = UIImage(systemName: image)
            var feel = String(format: "%.1f", response?.main?.feels_like ?? 0.0)
            self.feelLike.text = "Feel Like \(feel)°C"
            self.precipatation.text = "\(response?.clouds?.all ?? 0)%"
            self.windSpeed.text = "\(response?.wind?.speed ?? 0) km/h"
            
            // convert Int to Double
            let sunriceD = Double(response?.sys?.sunrise ?? 1595173588)
            let sunsetD = Double(response?.sys?.sunset ?? 1595173588)
            
            // create NSDate from Double (NSTimeInterval)
            let sr = Date(timeIntervalSince1970: sunriceD)
            let ss = Date(timeIntervalSince1970: sunsetD)
            
            let dateFormat = DateFormatter()
            dateFormat.dateFormat = "HH:mm a"
            
            self.sunset.text = "Sunset - \(dateFormat.string(from: ss))"
             self.sunrice.text = "Sunrise - \(dateFormat.string(from: sr))"
            
            dateFormat.dateFormat = "dd MMM yyyy"
            
            self.weatherDate.text = dateFormat.string(from: sr)

            
            
        }
    }
    
    func didFailWothError(_ error: Error?) {
        print(error)
    }
    
    
}


