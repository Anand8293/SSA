//
//  SlidingViewController.swift
//  Clima
//
//  Created by Anand Mac on 18/07/20.
//  Copyright © 2020 App Brewery. All rights reserved.
//

import UIKit

class SlidingViewController: UIViewController{
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func sideMenuHomePress(_ sender: UIButton) {
        let modelVc = self.storyboard?.instantiateViewController(withIdentifier: "ModelViewController") as! ModelViewController
             self.navigationController?.pushViewController(modelVc, animated: true)
          
        }
    @IBAction func sideMenuWeatherPress(_ sender: UIButton) {
        
        let modelVc = self.storyboard?.instantiateViewController(withIdentifier: "WeatherViewController") as! WeatherViewController
                   self.navigationController?.pushViewController(modelVc, animated: true)
        
    }
}
