//
//  WeatherBrain.swift
//  Clima
//
//  Created by Anand Mac on 30/05/20.
//  Copyright © 2020 App Brewery. All rights reserved.
//

import Foundation
import CoreLocation

struct WeatherBrain {
    
    var delegate: WeatherManagerDelegate?
    
    let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?appid=bf37a8e69bbbe1e1af531aa29b1bcb74&units=Metric&"
    
    func getWeather(city: String) {
        let url = weatherUrl + "q=\(city)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        fetchRequest(requestUrl: URL(string: url)!)
    }
    
    func getWeather(Latitude: Double, Longitude: Double) {
        let url = weatherUrl + "lat=\(Latitude)&lon=\(Longitude)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        fetchRequest(requestUrl: URL(string: url)!)
    }
    
    func fetchRequest(requestUrl: URL){
        
        let session = URLSession.shared.dataTask(with: requestUrl) { (data, response, error) in
            if error != nil {
                self.delegate?.didFailWothError(error)
                return
            }
            else if let safeData = data {
                let stringData = String(data: safeData, encoding: .utf8)!
                print(stringData)
                do {
                    let weather = try JSONDecoder().decode(WeatherData.self, from: safeData)
                    self.delegate?.didViewUpdated(response: weather)
                } catch {
                    self.delegate?.didFailWothError(error)
                }
                return
            }
        }
        session.resume()
    }
    
    func getConditionString(conditionID: Int) -> String {
        switch conditionID {
        case 200...232:
            return "cloud.bolt"
        case 300...321:
            return "cloud.drizzle"
        case 500...531:
            return "cloud.rain"
        case 600...622:
            return "cloud.snow"
        case 701...781:
            return "cloud.fog"
        case 800:
            return "sun.max"
        case 801...804:
            return "cloud.bolt"
        default:
            return "cloud"
        }
        
    }
    
}
