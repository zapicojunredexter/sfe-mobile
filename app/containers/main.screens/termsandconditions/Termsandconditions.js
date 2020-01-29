import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Card } from 'react-native-elements';
import UserService from '../../../services/user.service';
import StoreService from '../../../services/store.service';
import CustomerService from '../../../services/customers.service';

class Container extends React.Component<> {


    render() {
        return (
            <View style={{flex: 1}}>
              <ScrollView>
                  <Card>
                      <Text>
                        These Terms and Conditions shall apply to all orders of Streetfood Express products of a customer through this street food Delivery Website. By placing an order for Products through this Site, you understand, agree with, and accept: 
                      </Text>  
                      <Text>(i) these Terms and Conditions and any corresponding changes thereto which we may implement from time to time;</Text> 
                      <Text>(ii) our Privacy Policy in connection with how we process your personal information collected from this Site. </Text>
                      <Text style={{marginBottom: 10 }}>(iii) our Cash on Delivery  payment, the customer is obligue to pay the full payment upon delivery of the Ordered Product, if failure to meet the agreement will face the consequences</Text>
                      
                      <Text style={{fontWeight: 'bold'}}>1. Delivery Area</Text>
                      <Text style={{marginBottom: 10 }}>
                        Streetfood Express offers delivery services only within Cebu only. If your location or delivery area is not within any of delivery areas mentioned above, you will be prompted upon placing your order online.
                        Each Streetfood Express delivery store has a dedicated delivery area which cannot be changed. Thus, any forced request for re-routing of an order to another store is strictly prohibited.
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>2. Account Creation</Text>
                      <Text style={{marginBottom: 10 }}>
                         If you decide to place an order through this Site, you will be asked to register by creating an account which requires your personal information such as name, complete delivery address, telephone or mobile number, email address and a password. You must keep this password confidential and must not disclose it to anyone. If you believe someone else knows your password, please change your password immediately. We reserve the right to suspend your registration if you violate any of these Terms and Conditions.

                        If you wish to order as a guest, the site will require for your name, telephone or mobile number and complete delivery address.
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>3. Submission of Order</Text>
                      <Text style={{marginBottom: 10 }}>
                        Upon submission of your online order, you are authorizing the Vendor to process your online order and prepare the Products you have specified on your order form. However, we reserve the right to refuse the processing of your order without any notification should we find any incorrect or incomplete 

                        Also, your failure to respond to SMS and calls from the Store, Delivery Rider may result to late or non-delivery, which should not be taken against us. Additional verification calls or confirmation calls may be required to proceed with your order
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>4. Order Acceptance and Confirmation</Text>
                      <Text style={{marginBottom: 10 }}>
                      The acceptance of orders for the Products made through the Application shall be at the entire discretion of Streetfood Express. 

                        Our acceptance of an order occurs after you make an Order and During Payment their will be an Agreement message confirming that your order has been placed 
                        (“Order Confirmation”). The Order Confirmation is a record of our agreement to deliver the Products you ordered and your obligation to pay the price of the Products in full.
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>5. Cancellation of Orders</Text>
                      <Text style={{marginBottom: 10 }}>
                       Orders may be cancelled but the customer must pay the 30% of their full ordered products payment. We reserve the right to refuse any cancellation
                       in case the order has already been dispatched for delivery prior to receipt of your request
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>6. Prices and Payment</Text>
                      <Text style={{marginBottom: 10 }}>Unless otherwise stated in writing, the Product prices quoted on this Site are inclusive of value-added taxes, any other applicable taxes and delivery charge.

                            To check the price of the Products you want to order, please click the Checkout button to see the breakdown and total amount due.
                      </Text>

                      <Text style={{fontWeight: 'bold'}}>7. Delivery Conditions</Text>
                      <Text>You agree to accept delivery of the Products at the agreed time and place of delivery, subject to the specific delivery conditions below:</Text>
                      <Text> Delivery Time
                            The arrival time in our delivery service guarantee will be based on the Vendor's Driver arrival at the gate of your
                            subdivisions, villages, factories, industrial areas and other gated communities (as the case may be); while the
                            arrival time in buildings, hospitals, condominiums and hotels will be based on our Vendor's Driver arrival at the
                            lobby
                     </Text>
                  </Card>
              </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user: store.userStore.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
