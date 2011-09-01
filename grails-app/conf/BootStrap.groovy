import grailsjsonrestsample.*
import java.text.SimpleDateFormat
import grails.util.GrailsUtil
import grails.converters.JSON

class BootStrap {

    def init = { servletContext ->
		
		def dtFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
		
		def ari = new Person(name:"ari").save()
		if(ari.hasErrors()){
			println ari.errors
		}
		
		def jump = new Task(name:"jump",dueOn:dtFormat.parse("2011-08-04T05:00:00Z"))
					.addToAssignedTo(ari)
					.save()
		if(jump.hasErrors()){
			println jump.errors
		}
					
    }
	
    def destroy = {
    }
}
