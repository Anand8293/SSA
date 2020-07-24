//
//  MediaStreamView.swift
//  Clima
//
//  Created by Anand Mac on 20/07/20.
//  Copyright © 2020 App Brewery. All rights reserved.
//

import UIKit

protocol ButtonTapDelegate {
  func didTapButton()
}

class MediaStreamView: UIView, UINavigationControllerDelegate {
   
    @IBOutlet weak var addImageBtn: UIButton!
    var delegate: ButtonTapDelegate?
    
    @IBAction func didTapButton() {
        print("Clicked....")
        delegate?.didTapButton()
    }
    
    
    /*
     // Only override draw() if you perform custom drawing.
     // An empty implementation adversely affects performance during animation.
     override func draw(_ rect: CGRect) {
     // Drawing code
     }
     */
    
}
