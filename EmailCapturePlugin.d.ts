interface IAddress {
  getEmail(): string;
  getName():  string;
}

interface IAttachment {
  /**
   * Object that represents an attachment in an email message sent to an Email Capture plug-in implementation.
   * Each Attachment object contains properties for the attachment file name, attachment type, and the value of the attachment file.
   */
  getName(): string;
  /** Returns the file type of an attachment in an email message as a string. For example, this method returns PLAINTEXT, PDF, and MISCBINARY for text, PDF, and Microsoft Word files, respectively. */
  getType(): string;
  /**
   * Returns a text string for a text file attachment or base-64 encoded string for binary attachment types of an email message.
   * You can use getType() to define the behavior of the plug-in implementation depending on the file type of the attachment.
   */
  getValue(): string;
}

/** Object that represents an email message sent to the Email Capture plug-in implementation. */
interface IEmail {
  getAttachments(): IAttachment[];
  getCc():          IAddress;
  getFrom():        IAddress[];
  getHtmlBody():    string;
  getReplyTo():     IAddress;
  getSentDate():    Date;
  getSubject():     string;
  getTextBody():    string;
  getTo():          IAddress;
}
