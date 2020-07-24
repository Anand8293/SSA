//
//  ModelDetailsView.swift
//  Clima
//
//  Created by Anand Mac on 20/07/20.
//  Copyright © 2020 App Brewery. All rights reserved.
//

import UIKit

class ModelDetailsView: UIView {
    
    var generesText: [String] = ["React-Native", "Android", "iOS", "Ionic", "Kotlin", "Java"]
    
    @IBOutlet weak var generesCollectionView: UICollectionView!
    
    @IBOutlet weak var shapesCollectionView: UICollectionView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        self.generesCollectionView.dataSource = self
        self.generesCollectionView.delegate = self
        
         self.shapesCollectionView.dataSource = self
         self.shapesCollectionView.delegate = self

        self.shapesCollectionView.register(UINib.init(nibName: "ShapesCell", bundle: nil), forCellWithReuseIdentifier: "shapesId")
        
        self.generesCollectionView.register(UINib.init(nibName: "CustomViewCell", bundle: nil), forCellWithReuseIdentifier: "customViewCellID")
        
    }
    
}
extension ModelDetailsView: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        if collectionView == generesCollectionView {
            
            let label = UILabel(frame: CGRect.zero)
            label.text = generesText[indexPath.item]
            label.sizeToFit()
            
            return CGSize(width: label.frame.width + 20, height: 40)
        }
        else {
            return CGSize(width: 80, height: 70)
        }
        
    }
    
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return generesText.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
         if collectionView == generesCollectionView {
        
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "customViewCellID", for: indexPath) as? CustomViewCell else {
            fatalError("can't dequeue CustomCell")
        }
        cell.label.text = generesText[indexPath.row]
        return cell
        }
         else {
            guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "shapesId", for: indexPath) as? ShapesCell else {
                       fatalError("can't dequeue CustomCell")
                   }
                   return cell
        }
        
    }
}
